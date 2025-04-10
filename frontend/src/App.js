import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
    const [formData, setFormData] = useState({
        age: 55,
        gender: 1, // 1 = Male, 0 = Female
        partner: 0, // 1 = Yes, 0 = No
        dependents: 1, // Added Missing Feature
        tenure: 2.0,
        phoneService: 1, // Added Missing Feature
        multipleLines: 0, // Added Missing Feature
        internetService: 1, // Added Missing Feature
        onlineSecurity: 0, // Added Missing Feature
        onlineBackup: 1, // Added Missing Feature
        deviceProtection: 0, // Added Missing Feature
        techSupport: 1, // Added Missing Feature
        streamingTV: 0, // Added Missing Feature
        streamingMovies: 1, // Added Missing Feature
        contract: 0, // Added Missing Feature
        paperlessBilling: 1, // Added Missing Feature
        paymentMethod: 0, // Added Missing Feature
        monthlyCharges: 1, // Added Missing Feature
        totalCharges: 0, // Added Missing Feature
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loader state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: Number(value) });
    };

    const handlePredict = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true); // Show loader

        try {
            const featuresArray = Object.values(formData); // Now sending 19 features
            const response = await axios.post("https://customer-churn-analysis-iwp3.onrender.com/predict", {
                features: featuresArray,
            });

            setPrediction(response.data.prediction);
        } catch (err) {
            setError("Failed to get prediction. Check your input or try again later.");
        } finally {
            setLoading(false); // Hide loader after request completes
        }
    };

    return (
        <div className="container">
            <h1>Customer Churn Prediction</h1>
            <form onSubmit={handlePredict}>
                <label>Age:</label>
                <input type="number" name="age" min="0" value={formData.age} onChange={handleChange} required />

                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                </select>

                <label>Partner:</label>
                <select name="partner" value={formData.partner} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Dependents:</label>
                <select name="dependents" value={formData.dependents} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Tenure (months):</label>
                <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />

                <label>Phone Service:</label>
                <select name="phoneService" value={formData.phoneService} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Multiple Lines:</label>
                <select name="multipleLines" value={formData.multipleLines} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Internet Service:</label>
                <select name="internetService" value={formData.internetService} onChange={handleChange}>
                    <option value={1}>Fiber Optic</option>
                    <option value={0}>DSL</option>
                </select>

                <label>Online Security:</label>
                <select name="onlineSecurity" value={formData.onlineSecurity} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Online Backup:</label>
                <select name="onlineBackup" value={formData.onlineBackup} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Device Protection:</label>
                <select name="deviceProtection" value={formData.deviceProtection} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Tech Support:</label>
                <select name="techSupport" value={formData.techSupport} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Streaming TV:</label>
                <select name="streamingTV" value={formData.streamingTV} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Streaming Movies:</label>
                <select name="streamingMovies" value={formData.streamingMovies} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Contract:</label>
                <select name="contract" value={formData.contract} onChange={handleChange}>
                    <option value={1}>One Year</option>
                    <option value={0}>Month-to-Month</option>
                </select>

                <label>Paperless Billing:</label>
                <select name="paperlessBilling" value={formData.paperlessBilling} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Payment Method:</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                    <option value={1}>Credit Card</option>
                    <option value={0}>Bank Transfer</option>
                </select>

                <label>Monthly Charges:</label>
                <input type="number" name="monthlyCharges" value={formData.monthlyCharges} onChange={handleChange} required />

                <label>Total Charges:</label>
                <input type="number" name="totalCharges" value={formData.totalCharges} onChange={handleChange} required />

                <button type="submit" disabled={loading}>
                    {loading ? "Predicting..." : "Predict"}
                </button>
            </form>

            {loading && <div className="loader"></div>}

            {prediction !== null && <h2>Prediction: {prediction === 1 ? "Churn" : "No Churn"}</h2>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;