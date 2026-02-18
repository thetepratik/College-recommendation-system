from models.college_model import colleges
import pandas as pd

def get_college_dataframe():
    """
    Fetch college data from MongoDB and convert to Pandas DataFrame
    """
    college_list = list(colleges.find({}, {"_id": 0}))

    if not college_list:
        return pd.DataFrame()

    df = pd.DataFrame(college_list)

    # ✅ FEATURES THAT ACTUALLY EXIST IN YOUR CSV
    features = [
        "fees",
        "ranking",
        "placement_percentage",
        "infrastructure"
    ]

    # Keep only required columns
    df = df[features + ["college_name"]]

    return df
