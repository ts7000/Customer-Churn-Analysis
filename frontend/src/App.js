import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
    const [formData, setFormData] = useState({
        age: 55,
        gender: 1, // 1 = Male, 0 = Female
        partner: 0, // 1 = Yes, 0 = No
        tenure: 2.0,
        multipleServices: 1, // 1 = Yes, 0 = No
        customerComplaints: 1, // 1 = Yes, 0 = No
        irregularPayments: 1, // 1 = Yes, 0 = No
        lateFees: 20
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
            const featuresArray = Object.values(formData);
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
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

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

                <label>Tenure (months):</label>
                <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />

                <label>Multiple Services:</label>
                <select name="multipleServices" value={formData.multipleServices} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Customer Complaints:</label>
                <select name="customerComplaints" value={formData.customerComplaints} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Irregular Payments:</label>
                <select name="irregularPayments" value={formData.irregularPayments} onChange={handleChange}>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                </select>

                <label>Late Fees:</label>
                <input type="number" name="lateFees" value={formData.lateFees} onChange={handleChange} required />

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