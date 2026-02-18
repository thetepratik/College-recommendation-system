from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# ------------------ App Init ------------------
app = Flask(__name__)
CORS(app)

# ------------------ Database ------------------
from config.db import db   # db object (MongoDB)

# ------------------ Routes ------------------
from routes.auth_routes import auth_bp
from routes.college_routes import college_bp
from routes.user_routes import user_bp
from routes.admin_routes import admin_bp
from routes.recommend_routes import recommend_bp
from routes.profile_routes import profile_bp
from routes.admin_college_routes import admin_college_bp
from routes.admin_user_routes import admin_user_bp

# ------------------ Register Blueprints ------------------
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(college_bp, url_prefix="/api")
app.register_blueprint(user_bp, url_prefix="/api")
app.register_blueprint(admin_bp, url_prefix="/api")
app.register_blueprint(recommend_bp, url_prefix="/api")
app.register_blueprint(profile_bp, url_prefix="/api")
app.register_blueprint(admin_college_bp, url_prefix="/api")
app.register_blueprint(admin_user_bp, url_prefix="/api")

# ------------------ Health Check ------------------
@app.route("/")
def home():
    return {"status": "College Recommendation API is running 🚀"}

# ------------------ Run Server ------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
