from flask import Blueprint, jsonify, request, send_file
from config.db import db
import io
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from datetime import datetime

admin_user_bp = Blueprint("admin_user", __name__)
users = db.users


# =========================
# GET USERS (SEARCH + FILTER)
# =========================
@admin_user_bp.route("/admin/users", methods=["GET"])
def get_users():
    query = {}

    search = request.args.get("search")
    status = request.args.get("status")

    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}}
        ]

    if status and status != "All":
        query["status"] = status

    result = []

    for u in users.find(query):
        created_at = u.get("created_at")

        # ✅ SAFE DATE HANDLING
        if isinstance(created_at, datetime):
            created_at = created_at.strftime("%Y-%m-%d")
        else:
            created_at = "N/A"

        result.append({
            "user_id": u.get("user_id"),
            "name": u.get("name"),
            "email": u.get("email"),
            "role": u.get("role", "user"),
            "status": u.get("status", "Active"),
            "created_at": created_at
        })

    return jsonify(result)


# =========================
# UPDATE USER STATUS
# =========================
@admin_user_bp.route("/admin/users/<user_id>", methods=["PUT"])
def update_user_status(user_id):
    status = request.json.get("status")

    users.update_one(
        {"user_id": user_id},
        {"$set": {"status": status}}
    )

    return jsonify({"message": "User updated successfully"})


# =========================
# EXPORT USERS PDF
# =========================
@admin_user_bp.route("/admin/users/export/pdf", methods=["GET"])
def export_users_pdf():
    data = list(users.find({}))

    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(40, height - 40, "User Management Report")

    pdf.setFont("Helvetica", 10)
    y = height - 80

    headers = ["User ID", "Name", "Email", "Role", "Status"]
    x = [40, 120, 260, 420, 480]

    for i, h in enumerate(headers):
        pdf.drawString(x[i], y, h)

    y -= 20

    for u in data:
        pdf.drawString(40, y, u.get("user_id", ""))
        pdf.drawString(120, y, u.get("name", ""))
        pdf.drawString(260, y, u.get("email", ""))
        pdf.drawString(420, y, u.get("role", ""))
        pdf.drawString(480, y, u.get("status", ""))

        y -= 18
        if y < 40:
            pdf.showPage()
            y = height - 40

    pdf.save()
    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name="users_report.pdf",
        mimetype="application/pdf"
    )
