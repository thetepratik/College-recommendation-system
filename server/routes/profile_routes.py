from flask import Blueprint, request, jsonify, send_file
from pymongo import MongoClient
from bson.binary import Binary
import io
import os
from dotenv import load_dotenv

load_dotenv()

profile_bp = Blueprint("profile", __name__)

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["college_recommendation_db"]

# ---------------- SAVE / UPDATE PROFILE ----------------
@profile_bp.route("/profile/<user_id>", methods=["POST"])
def save_profile(user_id):
    data = request.json

    db.users.update_one(
        {"user_id": user_id},
        {"$set": data},
        upsert=True
    )

    return jsonify({"message": "Profile saved successfully"})


# ---------------- GET PROFILE ----------------
@profile_bp.route("/profile/<user_id>", methods=["GET"])
def get_profile(user_id):
    user = db.users.find_one(
        {"user_id": user_id},
        {"_id": 0, "profile_photo": 0}
    )

    if not user:
        return jsonify({}), 200

    return jsonify(user)


# ---------------- UPLOAD PROFILE PHOTO ----------------
@profile_bp.route("/profile/upload-photo/<user_id>", methods=["POST"])
def upload_photo(user_id):
    if "photo" not in request.files:
        return jsonify({"error": "No photo"}), 400

    image = request.files["photo"].read()

    db.users.update_one(
        {"user_id": user_id},
        {"$set": {"profile_photo": Binary(image)}},
        upsert=True
    )

    return jsonify({"message": "Photo uploaded"})


# ---------------- GET PROFILE PHOTO ----------------
@profile_bp.route("/profile/photo/<user_id>", methods=["GET"])
def get_photo(user_id):
    user = db.users.find_one({"user_id": user_id})

    if not user or "profile_photo" not in user:
        return jsonify({"error": "No photo"}), 404

    return send_file(
        io.BytesIO(user["profile_photo"]),
        mimetype="image/jpeg"
    )
