import jwt, os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv("JWT_SECRET")

def generate_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

def decode_token(token):
    return jwt.decode(token, SECRET, algorithms=["HS256"])
