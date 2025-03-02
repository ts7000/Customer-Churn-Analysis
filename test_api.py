import requests
import json

# URL of the Flask API
url = "http://127.0.0.1:5000/predict"

# Sample data to send to the API
data = {
    "features": [60, 0, 1, 0, 1, 0, 10.5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]  # Adjusted values
}
try:
    # Send POST request
    print("Sending POST request...")
    response = requests.post(url, json=data)
    
    # Print the response status code
    print(f"Status Code: {response.status_code}")
    
    # Print the response from the API
    print(f"Response Text: {response.text}")
    
except requests.exceptions.RequestException as e:
    # Print any error that occurs
    print(f"Error: {e}")