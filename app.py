from flask import Flask, request, jsonify
import joblib
import numpy as np
import logging
import traceback
import os

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

try:
    # Load model and scaler
    model = joblib.load("churn_model.pkl")
    scaler = joblib.load("scaler.pkl")
    app.logger.info("Model and scaler loaded successfully.")
except Exception as e:
    app.logger.error(f"Error loading model: {e}")
    exit(1)  # Exit if model loading fails

@app.route("/predict", methods=["POST"])
def predict():
    try:
        app.logger.debug("Received request for prediction")

        data = request.get_json(force=True)
        app.logger.debug(f"Request data: {data}")

        if not data or "features" not in data:
            return jsonify({"error": "Invalid request format"}), 400

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
    port = int(os.environ.get("PORT", 5000))  # Use Render's assigned port
    app.run(host="0.0.0.0", port=port)
