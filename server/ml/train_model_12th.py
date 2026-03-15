
import os
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import NearestNeighbors

# ===============================
# CORRECT BASE PATH
# ===============================
CURRENT_DIR = os.path.dirname(__file__)          # server/ml
SERVER_DIR = os.path.dirname(CURRENT_DIR)        # server
ROOT_DIR = os.path.dirname(SERVER_DIR)           # project root

DATASET_PATH = os.path.join(
    ROOT_DIR, "dataset", "colleges_12th_real.csv"
)

MODEL_PATH = os.path.join(CURRENT_DIR, "model_12th.pkl")
ENCODER_PATH = os.path.join(CURRENT_DIR, "encoders_12th.pkl")
SCALER_PATH = os.path.join(CURRENT_DIR, "scaler_12th.pkl")

# ===============================
# LOAD DATASET
# ===============================
df = pd.read_csv(DATASET_PATH)
print("📌 Dataset Loaded:", df.shape)

# ===============================
# FEATURES PRESENT IN YOUR CSV
# ===============================
features = [
    "fees",
    "placement_percentage",
    "lab_score",
    "faculty_score",
    "category_general",
    "category_obc",
    "category_sc",
    "category_st",
    "branch",
    "college_type",
    "entrance_exam",
    "state",
    "city"
]

df = df[features + ["college_name"]]

# ===============================
# HANDLE MISSING VALUES
# ===============================
df.fillna({
    "fees": df["fees"].median(),
    "placement_percentage": df["placement_percentage"].median(),
    "lab_score": 3,
    "faculty_score": 3,
    "category_general": 999999,
    "category_obc": 999999,
    "category_sc": 999999,
    "category_st": 999999,
    "branch": "Unknown",
    "college_type": "Private",
    "entrance_exam": "CET",
    "state": "Unknown",
    "city": "Unknown"
}, inplace=True)

# ===============================
# ENCODE CATEGORICAL DATA
# ===============================
encoders = {}
for col in ["branch", "college_type", "entrance_exam", "state", "city"]:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# ===============================
# SCALE + TRAIN MODEL
# ===============================
X = df.drop(columns=["college_name"])
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = NearestNeighbors(n_neighbors=15, metric="euclidean")
model.fit(X_scaled)

# ===============================
# SAVE FILES
# ===============================
joblib.dump(model, MODEL_PATH)
joblib.dump(encoders, ENCODER_PATH)
joblib.dump(scaler, SCALER_PATH)

print("✅ 12th Recommendation Model Trained Successfully")
print("📁 Files saved in server/ml/")
