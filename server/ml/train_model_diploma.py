# import os
# import pandas as pd
# import joblib
# from sklearn.preprocessing import StandardScaler
# from sklearn.neighbors import NearestNeighbors

# # 🔹 Paths
# BASE_DIR = os.path.dirname(__file__)
# DATASET_PATH = os.path.join(BASE_DIR, "../../dataset/colleges_diploma_real.csv")
# MODEL_DIR = os.path.join(BASE_DIR, "models")

# os.makedirs(MODEL_DIR, exist_ok=True)

# # 🔹 Load Dataset
# df = pd.read_csv(DATASET_PATH)
# print("📌 Dataset Loaded:", df.shape)

# # 🔹 Features used for ML
# features = [
#     "diploma_cutoff",
#     "fees",
#     "placement_percentage",
#     "lab_score",
#     "faculty_score"
# ]

# X = df[features]

# # 🔹 Scaling
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

# # 🔹 ML Model (Top-15 Neighbors)
# model = NearestNeighbors(
#     n_neighbors=15,
#     metric="euclidean"
# )
# model.fit(X_scaled)

# # 🔹 Save Model & Scaler
# joblib.dump(model, os.path.join(MODEL_DIR, "model_diploma.pkl"))
# joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler_diploma.pkl"))
# joblib.dump(df, os.path.join(MODEL_DIR, "data_diploma.pkl"))

# print("✅ Diploma ML model trained & saved successfully")
import os
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

BASE_DIR = os.path.dirname(__file__)
DATASET_PATH = os.path.join(BASE_DIR, "../../dataset/colleges_diploma_real.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)

# Load Dataset
df = pd.read_csv(DATASET_PATH)

print("📌 Diploma Dataset Loaded:", df.shape)

features = [
    "diploma_cutoff",
    "fees",
    "placement_percentage",
    "lab_score",
    "faculty_score"
]

X = df[features]

# Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Model
model = NearestNeighbors(
    n_neighbors=50,
    metric="euclidean"
)

model.fit(X_scaled)

# Save files
joblib.dump(model, os.path.join(MODEL_DIR, "model_diploma.pkl"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler_diploma.pkl"))
joblib.dump(df, os.path.join(MODEL_DIR, "data_diploma.pkl"))

print("✅ Diploma Model Trained Successfully")