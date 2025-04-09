import React, { useState, useEffect } from "react";
import { getMedicines } from "../config/firebase";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userMedicines, setUserMedicines] = useState([]);
  const [nearExpireMed, setnearExpireMed] = useState(0);
  const [expireMed, setExpireMed] = useState(0);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("currentMedCareUser"));
    setUserName(
      isUser.userName.charAt(0).toUpperCase() + isUser.userName.slice(1)
    );
    medicines(isUser.userId);
    handleMedicines();
  }, [userMedicines]);

  const medicines = async (userId) => {
    const medicines = await getMedicines(userId);
    setUserMedicines(medicines);
  };

  const handleMedicines = () => {
    let near = 0;
    let expire = 0;
    userMedicines.forEach((element) => {
      if (element.totalDays <= 2) {
        near += 1;
      }
      if (new Date(element.expiryDate) <= new Date()) {
        expire += 1;
      }
    });
    setnearExpireMed(near);
    setExpireMed(expire);
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-card welcome-card">
        <h2 className="dashboard-title">👋 Welcome {userName}! </h2>
        <p className="dashboard-message">Today is {today}</p>
        <p className="dashboard-subtext">
          Keep your medicines updated and track their expiry in real-time.
        </p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>📦 Total Medicines</h3>
          <p>{userMedicines?.length}</p>
        </div>
        <div className="stat-card">
          <h3>⏳ Expired</h3>
          <p>{expireMed}</p>
        </div>
        <div className="stat-card">
          <h3>🕐 Near Expiry</h3>
          <p>{nearExpireMed}</p>
        </div>
        <div className="stat-card">
          <h3>✅ Active</h3>
          <p>7</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
