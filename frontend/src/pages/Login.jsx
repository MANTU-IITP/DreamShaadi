import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [logininfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post("http://localhost:3000/auth/login", logininfo);

      console.log("Login success:", response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.name));

      alert("Login successful!");

      // Redirect to home or dashboard
      navigate("/");

    } catch (error) {
      console.error("Login error:", error.response || error);
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={logininfo.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={logininfo.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p className="switch-text">
        Don’t have an account?{" "}
        <span className="switch-link">
          <Link to="/signup">Signup</Link>
        </span>
      </p>
    </div>
  );
}


