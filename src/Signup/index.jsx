import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signup } from "../config/firebase";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!userName || !userEmail || !userPassword || !confirmPassword) {
        return alert("All fields are required!");
      }
      if (userPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const result = await signup({ userName, userEmail, userPassword });
      if (result) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>
        <FaUserPlus /> Signup
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <div className="account-prompt">
        Already have an account?
        <span className="login-link" onClick={() => navigate("/login")}>
          Login here
        </span>
      </div>
    </div>
  );
};

export default Signup;
