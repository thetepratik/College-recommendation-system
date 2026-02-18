from flask import Blueprint, jsonify
from config.db import db

admin_bp = Blueprint("admin", __name__)

users = db.users
colleges = db.colleges


@admin_bp.route("/admin/dashboard", methods=["GET"])
def admin_dashboard():

    # -------- USERS STATS --------
    users_total = users.count_documents({})
    users_active = users.count_documents({"status": "Active"})
    users_blocked = users.count_documents({"status": "Blocked"})

    # -------- COLLEGE STATS --------
    colleges_total = colleges.count_documents({})
    government_count = colleges.count_documents({"college_type": "Government"})
    private_count = colleges.count_documents({"college_type": "Private"})

    # -------- STATE WISE COLLEGES (SAFE) --------
    state_data = list(colleges.aggregate([
        {"$match": {"state": {"$exists": True, "$ne": ""}}},
        {"$group": {"_id": "$state", "count": {"$sum": 1}}},
        {"$project": {"state": "$_id", "count": 1, "_id": 0}},
        {"$sort": {"count": -1}}
    ]))

    # -------- CITY WISE COLLEGES --------
    city_data = list(colleges.aggregate([
        {"$match": {"city": {"$exists": True, "$ne": ""}}},
        {"$group": {"_id": "$city", "count": {"$sum": 1}}},
        {"$project": {"city": "$_id", "count": 1, "_id": 0}},
        {"$sort": {"count": -1}},
        {"$limit": 10}   # top 10 cities
    ]))


    # -------- TYPE WISE COLLEGES --------
    type_data = list(colleges.aggregate([
        {"$group": {"_id": "$college_type", "count": {"$sum": 1}}},
        {"$project": {"type": "$_id", "count": 1, "_id": 0}}
    ]))

    return jsonify({
        "users": {
            "total": users_total,
            "active": users_active,
            "blocked": users_blocked
        },
        "colleges": {
            "total": colleges_total,
            "government": government_count,
            "private": private_count,
            "by_state": state_data,
            "by_city": city_data, 
            "by_type": type_data
        }
    })



