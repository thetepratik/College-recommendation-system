from pymongo import MongoClient
import bcrypt
from datetime import datetime

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["college_recommendation_db"]
users = db.users

# Admin credentials
ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASSWORD = "admin123"

# Check if admin already exists
if users.find_one({"email": ADMIN_EMAIL}):
    print("✅ Admin already exists")
    exit()

# Hash password (IMPORTANT)
hashed_pw = bcrypt.hashpw(
    ADMIN_PASSWORD.encode("utf-8"),
    bcrypt.gensalt()
)

# Insert admin
users.insert_one({
    "user_id": "ADMIN001",
    "name": "System Admin",
    "email": ADMIN_EMAIL,
    "password": hashed_pw,   # ✅ BYTES
    "role": "admin",
    "status": "Active",
    "created_at": datetime.utcnow()
})

print("✅ Admin created successfully")
