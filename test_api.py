import requests
import json

# ✅ Use your Render URL (replace with your actual Render service URL)
url = "https://customer-churn-analysis-iwp3.onrender.com/predict"

# ✅ Sample data to send (adjust based on your model's feature requirements)
data = {
    "features": [60, 0, 1, 0, 1, 0, 10.5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
}

try:
    print("🔹 Sending POST request to API...")
    response = requests.post(url, json=data)

    print(f"🔹 Status Code: {response.status_code}")
    if response.status_code == 200:
        print(f"✅ Prediction Response: {response.json()}")
    else:
        print(f"❌ Error Response: {response.text}")

except requests.exceptions.RequestException as e:
    print(f"❌ Request Error: {e}")
