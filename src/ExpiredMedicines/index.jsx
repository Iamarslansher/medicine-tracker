import React, { useState, useEffect } from "react";
import { FaTimesCircle, FaTrash } from "react-icons/fa";
import { getMedicines, deleteMedi } from "../config/firebase";
import "../styles/ExpiredMedicines.css";

const ExpiredMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const userId = user.userId;
    handleMedicines(userId);
    setUserID(userId);
  }, []);

  const handleMedicines = async (userId) => {
    const medicines = await getMedicines(userId);
    let expired = [];
    medicines.forEach((medicine) => {
      if (new Date(medicine.expiryDate) <= new Date()) {
        expired.push(medicine);
      }
    });
    setMedicines(expired);
    console.log(expired);
  };
  // Delete Medicine
  const handleDelete = async (medicineID) => {
    try {
      await deleteMedi({ medicineID, userID });
      const medicines = await getMedicines(userID);
      let expired = [];
      medicines.forEach((medicine) => {
        if (new Date(medicine.expiryDate) <= new Date()) {
          expired.push(medicine);
        }
      });
      setMedicines(expired);
      console.log("Medicine deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="expired-medicines">
      <h2>
        <FaTimesCircle /> Expired Medicines
      </h2>
      {medicines.length === 0 && <h2>No Expired Medicines Yet!</h2>}
      {medicines.map((medicine) => (
        <ul key={medicine.id}>
          <li>
            <h4>{medicine.medicineName}</h4>

            <span>
              Aspirin - Expired on: <strong>{medicine.expiryDate}</strong>
            </span>
            <FaTrash
              onClick={() => handleDelete(medicine.medicineID)}
              style={{ fontSize: "30px" }}
            />
          </li>
        </ul>
      ))}
    </div>
  );
};
export default ExpiredMedicines;
