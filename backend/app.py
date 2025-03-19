from flask import Flask, request, jsonify
import joblib
import numpy as np
import logging
import traceback
import os
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics

app = Flask(__name__)
CORS(app)

# Prometheus monitoring setup
metrics = PrometheusMetrics(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

try:
    # Load model and scaler
    model = joblib.load("churn_model.pkl")
    scaler = joblib.load("scaler.pkl")
    app.logger.info("✅ Model and scaler loaded successfully.")
except Exception as e:
    app.logger.error(f"❌ Error loading model: {e}")
    exit(1)  # Exit if model loading fails

# Monitoring: Track request count & latency
metrics.info("app_info", "Customer Churn Prediction API", version="1.0.0")

@app.before_request
def before_request():
    """ Add security headers to responses. """
    request.environ['werkzeug.request_remote_addr'] = request.headers.get('X-Forwarded-For', request.remote_addr)

@app.route("/predict", methods=["POST"])
@metrics.summary('predict_requests', 'Prediction Request Processing Time', labels={'status': lambda r: r.status_code})
def predict():
    try:
        app.logger.debug("📥 Received request for prediction")

        data = request.get_json(force=True)
        app.logger.debug(f"📦 Request data: {data}")

        if not data or "features" not in data:
            return jsonify({"error": "Invalid request format"}), 400

        features = np.array(data["features"]).reshape(1, -1)
        app.logger.debug(f"🧩 Features array: {features}")

        # Validate input feature size
        if features.shape[1] != scaler.n_features_in_:
            error_msg = f"⚠️ Expected {scaler.n_features_in_} features but got {features.shape[1]}"
            app.logger.error(error_msg)
            return jsonify({"error": error_msg}), 400

        # Preprocess input
        features_scaled = scaler.transform(features)
        app.logger.debug(f"📊 Scaled features: {features_scaled}")

        # Make a prediction
        prediction = model.predict(features_scaled)
        app.logger.debug(f"🔮 Prediction: {prediction[0]}")

        return jsonify({"prediction": int(prediction[0])})

    except Exception as e:
        app.logger.error(f"❌ Error during prediction: {e}")
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# Health check route
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use Render's assigned port
    app.run(host="0.0.0.0", port=port)