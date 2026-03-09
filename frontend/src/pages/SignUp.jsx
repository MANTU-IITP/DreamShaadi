import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

export default function SignUp() {
  const [signupinfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required')
    }

    try {
      const response=await axios.post("http://localhost:3000/auth/signup", signupinfo);


      console.log("Signup success:", response.data);
      // navigate after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response ?? error);
      // optionally show user-friendly error message here
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          value={signupinfo.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={signupinfo.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={signupinfo.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      <p className="switch-text">
        Already have an account?{" "}
        <span className="switch-link">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
}
