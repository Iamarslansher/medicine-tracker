import React, { useEffect, useState } from "react";
import { FaPills, FaTrash, FaSearch } from "react-icons/fa";
import { getMedicines, deleteMedi } from "../config/firebase";
import "../styles/AllMedicines.css";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const userId = user.userId;
    userMedicines(userId);
    setUserID(userId);
  }, []);
  const userMedicines = async (userId) => {
    const medicines = await getMedicines(userId);
    setMedicines(medicines);
  };

  // Handle medicine deletion
  const handleDelete = async (medicineID) => {
    try {
      await deleteMedi({ medicineID, userID });
      const medicines = await getMedicines(userID);
      setMedicines(medicines);
      console.log("Medicine deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medicine-list-container">
      <div className="medicine-list-card">
        <h2 className="medicine-list-title">
          <FaPills className="title-icon" /> All Medicines
        </h2>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredMedicines.length > 0 ? (
          <ul className="medicine-items">
            {filteredMedicines.map((med, index) => (
              <li key={index} className="medicine-item">
                <div className="medicine-info">
                  <h4>{med.medicineName}</h4>
                  <p>Expiry: {med.expiryDate}</p>
                  <p>{!med.doctorName ? "" : med.doctorName}</p>
                </div>
                <button
                  className="delete-btn"
                  title="Delete"
                  onClick={() => handleDelete(med.medicineID)}
                >
                  <FaTrash style={{ fontSize: "20px" }} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No medicines found</p>
        )}
      </div>
    </div>
  );
};

export default MedicineList;
