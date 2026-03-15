# import sys
# import os
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# import pickle
# from sklearn.preprocessing import MinMaxScaler
# from utils.helpers import get_college_dataframe


# def train_and_save_model():
#     df = get_college_dataframe()

#     if df.empty:
#         print("❌ No college data found in MongoDB")
#         return

#     # ✅ SAME FEATURES AS helpers.py
#     features = [
#         "fees",
#         "ranking",
#         "placement_percentage",
#         "infrastructure"
#     ]

#     X = df[features]

#     scaler = MinMaxScaler()
#     X_scaled = scaler.fit_transform(X)

#     model = {
#         "scaler": scaler,
#         "data": X_scaled,
#         "college_names": df["college_name"].tolist(),
#         "features": features
#     }

#     with open("ml/model.pkl", "wb") as f:
#         pickle.dump(model, f)

#     print("✅ model.pkl created successfully")


# if __name__ == "__main__":
#     train_and_save_model()
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pickle
from sklearn.preprocessing import MinMaxScaler
from utils.helpers import get_college_dataframe


def train_and_save_model():
    df = get_college_dataframe()

    if df.empty:
        print("❌ No college data found in MongoDB")
        return

    # ✅ SAME FEATURES AS helpers.py
    features = [
        "fees",
        "ranking",
        "placement_percentage",
        "infrastructure"
    ]

    X = df[features]

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    model = {
        "scaler": scaler,
        "data": X_scaled,
        "college_names": df["college_name"].tolist(),
        "features": features
    }

    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)

    print("✅ model.pkl created successfully")


if __name__ == "__main__":
    train_and_save_model()