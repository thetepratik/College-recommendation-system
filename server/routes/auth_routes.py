from flask import Blueprint, request, jsonify
from models.user_model import users
import bcrypt
import jwt
import os
from datetime import datetime, timedelta

auth_bp = Blueprint("auth", __name__)
SECRET = os.getenv("JWT_SECRET", "secretkey")

# =========================
# REGISTER
# =========================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "All fields required"}), 400

    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user_id = f"U{int(datetime.utcnow().timestamp())}"

    users.insert_one({
        "user_id": user_id,
        "name": data["name"],
        "email": data["email"],
        "password": hashed_pw,   # ✅ ALWAYS BYTES
        "role": "user",
        "status": "Active",
        "created_at": datetime.utcnow()
    })

    return jsonify({"message": "Registration successful"}), 201


# =========================
# LOGIN
# =========================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users.find_one({"email": data["email"]})
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    if not bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user["password"]
    ):
        return jsonify({"message": "Invalid email or password"}), 401

    if user.get("status") == "Blocked":
        return jsonify({"message": "Account blocked"}), 403

    token = jwt.encode(
        {
            "user_id": user["user_id"],
            "role": user["role"],
            "exp": datetime.utcnow() + timedelta(hours=2)
        },
        SECRET,
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user_id": user["user_id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"]
    })
