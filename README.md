Customer Churn Prediction

Overview

This project is a Customer Churn Prediction Web App that leverages machine learning models to predict whether a customer is likely to churn based on various input features. The application is built using Flask for the backend and React.js for the frontend. It also implements security tools like Gitleaks and Syft to enhance code security and software supply chain security.

Features

Predicts customer churn based on input features.

Backend: Flask with a trained ML model.

Frontend: React.js with a clean UI.

API requests via Axios to communicate with the backend.

Uses SMOTE for data balancing.

Machine Learning Models: Logistic Regression, Decision Tree, Random Forest, Deep Learning, KNN, SVM, XGBoost.

DevOps & Security Enhancements:

Gitleaks for detecting hardcoded secrets in the repository.

Syft for software composition analysis and vulnerability detection.

Deployed on Render.

Tech Stack

Frontend: React.js, CSS

Backend: Flask, Python

Machine Learning: Scikit-Learn, XGBoost, TensorFlow

Database: Pandas (for CSV-based dataset handling)

Security Tools: Gitleaks, Syft

Deployment: Render

Setup Instructions

Prerequisites

Ensure you have the following installed:

Node.js & npm (for frontend)

Python 3.x (for backend)

pip (Python package manager)

Backend Setup (Flask API)

# Clone the repository
git clone https://github.com/ts7000/customer-churn-prediction.git
cd customer-churn-prediction/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use 'venv\Scripts\activate'

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py

Frontend Setup (React.js)

cd customer-churn-prediction/frontend

# Install dependencies
npm install

# Start the frontend
npm start

Running Security Scans

Gitleaks (Secret Detection)

gitleaks detect -v

Syft (Software Composition Analysis)

syft .

Usage

Open http://localhost:3000 in your browser.

Enter customer details and click "Predict".

The model will predict Churn (Yes/No).

Deployment

Backend deployed on Render.

Frontend hosted separately, making API calls to the backend.

Future Improvements

Add more monitoring tools like Grafana & Prometheus.

Enhance security with SonarQube & OWASP ZAP.

Automate DevOps pipeline with Terraform & Airflow.

Contributors

Tanuj Singh

License

This project is licensed under the MIT License.
