import React, { useState, useEffect } from "react";
import { FaPlus, FaUserMd, FaPills, FaCalendarAlt } from "react-icons/fa";
import { addMedicine } from "../config/firebase";
import "../styles/addmedicine.css";

const AddMedicine = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("currentMedCareUser"));
    setUserName(isUser.userName);
    setUserId(isUser.userId);
  }, []);

  const add_Medicine = async (e) => {
    e.preventDefault();
    if (purchaseDate > expiryDate) {
      alert("Expiry date should be greater than purchase date!");
      return;
    }

    const start = new Date(purchaseDate);
    const end = new Date(expiryDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    try {
      const medicineData = {
        userName,
        userId,
        medicineName,
        purchaseDate,
        expiryDate,
        doctorName,
        totalDays: diffDays,
      };
      await addMedicine(medicineData);
      setMedicineName("");
      setPurchaseDate("");
      setExpiryDate("");
      setDoctorName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="add-medicine-container">
      <div className="add-medicine-card">
        <h2 className="add-medicine-title">
          <FaPlus className="add-icon" /> Add New Medicine
        </h2>

        <form className="add-medicine-form" onSubmit={add_Medicine}>
          <div className="input-group">
            <FaPills className="input-icon" />
            <input
              type="text"
              placeholder="Medicine Name"
              required
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              placeholder="Purchase Date"
              required
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              placeholder="Expiry Date"
              required
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaUserMd className="input-icon" />
            <input
              type="text"
              placeholder="Doctor Name (Optional)"
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>

          <button className="submit-btn" type="submit">
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
