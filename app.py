from flask import Flask, request, jsonify
import joblib
import numpy as np
import logging
import traceback

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load the model and scaler
model = joblib.load("churn_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        app.logger.debug("Received request for prediction")
        
        data = request.get_json(force=True)
        app.logger.debug(f"Request data: {data}")

        if not data:
            return jsonify({"error": "Empty request body"}), 400

        if "features" not in data:
            return jsonify({"error": "Missing 'features' key in request"}), 400

        if not isinstance(data["features"], list):
            return jsonify({"error": "'features' should be a list"}), 400

        features = np.array(data["features"]).reshape(1, -1)
        app.logger.debug(f"Features array: {features}")

        # Preprocess input
        features_scaled = scaler.transform(features)
        app.logger.debug(f"Scaled features: {features_scaled}")

        # Make a prediction
        prediction = model.predict(features_scaled)
        app.logger.debug(f"Prediction: {prediction[0]}")

        return jsonify({"prediction": int(prediction[0])})
    
    except Exception as e:
        app.logger.error(f"Error during prediction: {e}")
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)