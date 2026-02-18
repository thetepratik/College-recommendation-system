import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def get_recommendations(user_input):
    with open("ml/model.pkl", "rb") as f:
        model = pickle.load(f)

    scaler = model["scaler"]
    college_data = model["data"]
    college_names = model["college_names"]

    user_scaled = scaler.transform([user_input])

    similarity = cosine_similarity(college_data, user_scaled).flatten()

    top_indices = similarity.argsort()[-15:][::-1]

    recommendations = []
    for i in top_indices:
        recommendations.append({
            "college_name": college_names[i],
            "score": float(similarity[i])
        })

    return recommendations
