from flask import Blueprint, request, jsonify
from config.db import db
import base64

admin_college_bp = Blueprint("admin_college", __name__)

# ================= ADD =================
@admin_college_bp.route("/admin/colleges", methods=["POST"])
def add_college():
    data = dict(request.form)

    if "college_image" in request.files:
        img = request.files["college_image"].read()
        data["college_image"] = base64.b64encode(img).decode("utf-8")

    db.colleges.insert_one(data)
    return jsonify({"msg": "College added"}), 201


# ================= UPDATE =================
@admin_college_bp.route("/admin/colleges/<college_id>", methods=["PUT"])
def update_college(college_id):
    data = dict(request.form)

    if "college_image" in request.files:
        img = request.files["college_image"].read()
        data["college_image"] = base64.b64encode(img).decode("utf-8")

    db.colleges.update_one(
        {"college_id": college_id},
        {"$set": data}
    )
    return jsonify({"msg": "College updated"})


# ================= DELETE =================
@admin_college_bp.route("/admin/colleges/<college_id>", methods=["DELETE"])
def delete_college(college_id):
    db.colleges.delete_one({"college_id": college_id})
    return jsonify({"msg": "College deleted"})
