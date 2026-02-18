import csv
from pymongo import MongoClient

# 🔹 MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["college_recommendation"]
collection = db["diploma_colleges"]

# 🔹 Clear old data
collection.delete_many({})
print("🗑️ Old diploma college data cleared")

# 🔹 CSV Path (UPDATE IF NEEDED)
CSV_PATH = "../dataset/colleges_diploma_real.csv"

# 🔹 Insert CSV Data
with open(CSV_PATH, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    data = []

    for row in reader:
        data.append({
            "college_id": row["college_id"],
            "college_name": row["college_name"],
            "state": row["state"],
            "city": row["city"],
            "college_type": row["college_type"],
            "branch": row["branch"],
            "diploma_cutoff": float(row["diploma_cutoff"]),
            "lateral_entry_exam": row["lateral_entry_exam"],
            "fees": int(row["fees"]),
            "placement_percentage": float(row["placement_percentage"]),
            "lab_score": int(row["lab_score"]),
            "faculty_score": int(row["faculty_score"]),
        })

    if data:
        collection.insert_many(data)

print(f"✅ Imported {len(data)} diploma colleges into MongoDB")
