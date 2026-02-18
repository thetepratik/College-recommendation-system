from flask import Blueprint, request, jsonify
from models.college_model import colleges
import re

college_bp = Blueprint("college", __name__)

# =====================================
# GET ALL / FILTERED COLLEGES (USER)
# =====================================
@college_bp.route("/colleges", methods=["GET"])
def get_colleges():
    query = {}

    # 🔍 SEARCH BY NAME
    search = request.args.get("search")
    if search and search.strip():
        query["college_name"] = {
            "$regex": re.compile(search.strip(), re.IGNORECASE)
        }

    # 💰 MAX FEES
    max_fees = request.args.get("maxFees")
    if max_fees and max_fees.isdigit():
        query["fees"] = {"$lte": int(max_fees)}

    # 🏆 MAX RANKING (lower is better)
    max_rank = request.args.get("maxRank")
    if max_rank and max_rank.isdigit():
        query["ranking"] = {"$lte": int(max_rank)}

    # 📈 MIN PLACEMENT %
    min_placement = request.args.get("minPlacement")
    if min_placement and min_placement.isdigit():
        query["placement_percentage"] = {"$gte": int(min_placement)}

    # 🏫 COLLEGE TYPE (Government / Private)
    college_type = request.args.get("collegeType")
    if college_type:
        query["college_type"] = college_type

    # 📍 STATE
    state = request.args.get("state")
    if state:
        query["state"] = state

    # 📍 CITY
    city = request.args.get("city")
    if city:
        query["city"] = city

    # =====================================
    # FETCH DATA
    # =====================================
    data = list(
        colleges.find(
            query,
            {"_id": 0}  # exclude Mongo _id
        )
    )

    return jsonify(data)
