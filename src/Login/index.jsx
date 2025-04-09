import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";
import { login } from "../config/firebase";
import "../styles/login.css";
const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        return alert("All fields are required!");
      }
      const result = await login({ email, password });
      if (result) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <FaSignInAlt className="login-icon" />
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to login</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <button
                type="button"
                className="checkbox-btn"
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe ? <FaCheckSquare /> : <FaSquare />}
                <span>Remember me</span>
              </button>
            </div>
            <div className="forgot-password">
              <a href="/reset-password">Forgot password?</a>
            </div>
          </div>

          <button
            // onClick={() => navigate("/dashboard")}
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-btn google">Continue with Google</button>
          <button className="social-btn facebook">
            Continue with Facebook
          </button>
        </div>

        <div className="signup-prompt">
          <span>Don't have an account? </span>
          <a onClick={() => navigate("/signup")}>Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
