import csv
from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["college_recommendation_db"]
collection = db["colleges_12th"]

# Clear old data
collection.delete_many({})
print("🗑️ Old 12th college data cleared")

CSV_FILE = "../dataset/colleges_12th_real.csv"

def safe_int(value, default=0):
    try:
        return int(value)
    except:
        return default

def safe_float(value, default=0.0):
    try:
        return float(value)
    except:
        return default

with open(CSV_FILE, newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        doc = {
            "college_id": row.get("college_id"),
            "college_name": row.get("college_name"),
            "state": row.get("state"),
            "city": row.get("city"),
            "college_type": row.get("college_type"),
            "branch": row.get("branch"),
            "stream": row.get("stream"),
            "entrance_exam": row.get("entrance_exam"),

            "closing_rank": safe_int(row.get("closing_rank")),
            "fees": safe_int(row.get("fees")),
            "placement_percentage": safe_int(row.get("placement_percentage")),
            "infrastructure_score": safe_int(row.get("infrastructure_score")),
            "nirf_rank": safe_int(row.get("nirf_rank")),

            "category_general": safe_int(row.get("category_general")),
            "category_obc": safe_int(row.get("category_obc")),
            "category_sc": safe_int(row.get("category_sc")),
            "category_st": safe_int(row.get("category_st")),

            "lab_score": safe_int(row.get("lab_score")),
            "faculty_score": safe_int(row.get("faculty_score")),
        }

        collection.insert_one(doc)

print("✅ 12th Colleges Imported Successfully")
