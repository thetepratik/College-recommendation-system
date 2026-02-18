from flask import Blueprint, request, jsonify
from models.user_model import users
from utils.auth_utils import decode_token

user_bp = Blueprint("user", __name__)

@user_bp.route("/user/profile", methods=["GET", "PUT"])
def profile():
    token = request.headers.get("Authorization").split()[1]
    user_id = decode_token(token)["user_id"]

    if request.method == "GET":
        user = users.find_one({"_id": user_id}, {"password": 0})
        return jsonify(user)

    data = request.json
    users.update_one({"_id": user_id}, {"$set": data})
    return jsonify({"message": "Profile updated"})
