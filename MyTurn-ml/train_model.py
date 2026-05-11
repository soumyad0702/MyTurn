import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeRegressor
import joblib

data = pd.read_csv("queue_data.csv")

le_orgType = LabelEncoder()
le_orgName = LabelEncoder()
le_service = LabelEncoder()
data["orgType"] = le_orgType.fit_transform(data["orgType"])
data["orgName"] = le_orgName.fit_transform(data["orgName"])
data["serviceId"] = le_service.fit_transform(data["serviceId"])

X = data[["orgType", "orgName", "serviceId", "waitingCount", "hour"]]
y = data["serviceTime"]

model = DecisionTreeRegressor()
model.fit(X, y)

print("✅ Model trained successfully!")

joblib.dump(model, "queue_model.pkl")
joblib.dump(le_orgType, "encoder_orgType.pkl")
joblib.dump(le_orgName, "encoder_orgName.pkl")
joblib.dump(le_service, "encoder_service.pkl")

print("✅ Model saved!")