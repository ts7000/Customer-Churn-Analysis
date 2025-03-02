import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [features, setFeatures] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState("");

    const handlePredict = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous errors

        try {
            const featureArray = features.split(",").map(Number);
            const response = await axios.post("https://customer-churn-analysis-iwp3.onrender.com/predict", {
                features: featureArray,
            });
            console.log(response.data.prediction);
            setPrediction(response.data.prediction);
        } catch (err) {
            setError("Failed to get prediction. Check your input or try again later.");
        }
    };

    return (
        <div className="container">
            <h1>Customer Churn Prediction</h1>
            <form onSubmit={handlePredict}>
                <label>Enter Features (comma-separated):</label>
                <input
                    type="text"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="e.g. 60,0,1,0,1,0,10.5,0,1,0,1,0,1,0,1,0,1,0,1"
                    required
                />
                <button type="submit">Predict</button>
            </form>

            {prediction !== null && <h2>Prediction: {prediction === 1 ? "Churn" : "No Churn"}</h2>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;
