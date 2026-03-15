# from flask import Blueprint, request, jsonify
# from pymongo import DESCENDING
# from config.db import db   # ✅ SAME DB USED EVERYWHERE

# recommend_bp = Blueprint("recommend", __name__)

# # =====================================================
# # 12TH STUDENT RECOMMENDATION
# # =====================================================
# @recommend_bp.route("/recommend/12th", methods=["POST"])
# def recommend_12th():
#     try:
#         data = request.json or {}

#         # ---------- INPUTS ----------
#         rank = int(data.get("rank") or 999999)
#         branch = data.get("branch")
#         state = data.get("state")
#         city = data.get("city")
#         college_types = data.get("collegeType", [])
#         budget = int(data.get("budget") or 9999999)
#         entrance_exam = data.get("entranceExam")
#         category = data.get("category", "General")

#         # ---------- CATEGORY MAP ----------
#         category_field_map = {
#             "General": "category_general",
#             "OBC": "category_obc",
#             "SC": "category_sc",
#             "ST": "category_st"
#         }
#         cutoff_field = category_field_map.get(category, "category_general")

#         # ---------- BASE QUERY ----------
#         query = {
#             cutoff_field: {"$gte": rank},   # ✅ rank eligibility
#             "fees": {"$lte": budget}
#         }

#         if branch:
#             query["branch"] = branch
#         if state:
#             query["state"] = state
#         if city:
#             query["city"] = city
#         if college_types:
#             query["college_type"] = {"$in": college_types}
#         if entrance_exam:
#             query["entrance_exam"] = entrance_exam

#         # ---------- FETCH & RANK ----------
#         colleges = list(
#             db.colleges_12th
#             .find(query, {"_id": 0})
#             .sort([
#                 ("placement_percentage", DESCENDING),
#                 ("infrastructure_score", DESCENDING),
#                 ("lab_score", DESCENDING),
#             ])
#             .limit(15)
#         )

#         return jsonify(colleges)

#     except Exception as e:
#         print("❌ 12th Recommendation Error:", e)
#         return jsonify({"error": "Failed to fetch recommendations"}), 500


# # =====================================================
# # DIPLOMA STUDENT RECOMMENDATION
# # =====================================================
# @recommend_bp.route("/recommend/diploma", methods=["POST"])
# def recommend_diploma():
#     try:
#         data = request.json or {}

#         diploma_percent = float(data.get("diplomaPercent") or 0)
#         branch = data.get("branch")
#         state = data.get("state")
#         city = data.get("city")
#         college_types = data.get("collegeType", [])
#         budget = int(data.get("budget") or 9999999)

#         query = {
#             "diploma_cutoff": {"$lte": diploma_percent},
#             "fees": {"$lte": budget}
#         }

#         if branch:
#             query["branch"] = branch
#         if state:
#             query["state"] = state
#         if city:
#             query["city"] = city
#         if college_types:
#             query["college_type"] = {"$in": college_types}

#         colleges = list(
#             db.colleges_diploma
#             .find(query, {"_id": 0})
#             .sort("placement_percentage", DESCENDING)
#             .limit(15)
#         )

#         return jsonify(colleges)

#     except Exception as e:
#         print("❌ Diploma Recommendation Error:", e)
#         return jsonify({"error": "Failed to fetch recommendations"}), 500

from flask import Blueprint, request, jsonify
from pymongo import DESCENDING
from config.db import db

recommend_bp = Blueprint("recommend", __name__)

# =====================================================
# 12TH STUDENT RECOMMENDATION
# =====================================================
@recommend_bp.route("/recommend/12th", methods=["POST"])
def recommend_12th():
    try:
        data = request.json or {}

        branch = data.get("branch")
        state = data.get("state")
        city = data.get("city")
        college_types = data.get("collegeType", [])
        budget = int(data.get("budget") or 9999999)
        entrance_exam = data.get("entranceExam")

        query = {
            "fees": {"$lte": budget}
        }

        if branch:
            query["branch"] = {"$regex": branch, "$options": "i"}

        if state:
            query["state"] = {"$regex": state, "$options": "i"}

        if city:
            query["city"] = {"$regex": city, "$options": "i"}

        if college_types:
            query["college_type"] = {"$in": college_types}

        if entrance_exam:
            query["entrance_exam"] = entrance_exam

        colleges = list(
            db.colleges_12th
            .find(query, {"_id": 0})
            .sort([
                ("placement_percentage", DESCENDING),
                ("lab_score", DESCENDING),
                ("faculty_score", DESCENDING)
            ])
            .limit(30)
        )

        return jsonify(colleges)

    except Exception as e:
        print("❌ 12th Recommendation Error:", e)
        return jsonify({"error": "Failed to fetch recommendations"}), 500

# =====================================================
# DIPLOMA STUDENT RECOMMENDATION
# =====================================================
@recommend_bp.route("/recommend/diploma", methods=["POST"])
def recommend_diploma():
    try:
        data = request.json or {}

        diploma_percent = float(data.get("diplomaPercent") or 0)
        branch = data.get("branch")
        state = data.get("state")
        city = data.get("city")
        college_types = data.get("collegeType", [])
        budget = int(data.get("budget") or 9999999)

        # ---------- BASE QUERY ----------
        query = {
            "diploma_cutoff": {"$lte": diploma_percent},
            "fees": {"$lte": budget}
        }

        # ---------- FILTERS ----------
        if branch:
            query["branch"] = {"$regex": branch, "$options": "i"}

        if state:
            query["state"] = {"$regex": f"^{state}$", "$options": "i"}

        if city:
            query["city"] = {"$regex": f"^{city}$", "$options": "i"}

        if college_types:
            query["college_type"] = {"$in": college_types}

        # ---------- FETCH ----------
        colleges = list(
            db.colleges_diploma
            .find(query, {"_id": 0})
            .sort("placement_percentage", DESCENDING)
            .limit(30)
        )

        return jsonify(colleges)

    except Exception as e:
        print("❌ Diploma Recommendation Error:", e)
        return jsonify({"error": "Failed to fetch recommendations"}), 500