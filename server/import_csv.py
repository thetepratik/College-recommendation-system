import csv
from pymongo import MongoClient
import os

client = MongoClient("mongodb://localhost:27017/")
db = client["college_recommendation_db"]
collection = db["colleges"]

collection.delete_many({})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "..", "dataset", "colleges.csv")

with open(CSV_PATH, "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    raw_data = list(reader)

    if not raw_data:
        print("❌ CSV file is empty")
        exit()

    print("✅ ORIGINAL CSV HEADERS:", raw_data[0].keys())

    cleaned_data = []

    for row in raw_data:
        # Normalize keys: lowercase + strip spaces
        row = {k.strip().lower(): v for k, v in row.items()}

        cleaned_data.append({
            "college_id": row.get("college_id"),
            "college_name": row.get("college_name"),
            "college_image": row.get("college_image"),
            "official_website": row.get("official_website"),

            # numeric fields (safe conversion)
            "fees": int(float(row.get("fees", 0))),
            "ranking": int(float(row.get("ranking", 0))),
            "placement_percentage": int(float(row.get("placement_percentage", 0))),
            "infrastructure": int(float(row.get("infrastructure", 0)))
        })

collection.insert_many(cleaned_data)

print("✅ CSV data imported into MongoDB successfully")
