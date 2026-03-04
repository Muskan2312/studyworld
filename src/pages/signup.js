import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      alert("Signup successful!");
      navigate("/login-signup");
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <style>
        {`
          .signup-bg {
            height: 100vh;
            background: #f8eaff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            font-family: Poppins, sans-serif;
          }

          .signup-card {
            width: 480px;
            background: white;
            padding: 45px 40px;
            border-radius: 25px;
            box-shadow: 0px 10px 30px rgba(200, 0, 255, 0.15);
            text-align: center;
          }

          .signup-title {
            font-size: 42px;
            font-weight: 800;
            color: #d500f9;
            margin-bottom: 8px;
          }

          .signup-sub {
            font-size: 17px;
            color: #6e5d8c;
            margin-bottom: 35px;
          }

          .signup-input-box {
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
          }

          .signup-label {
            font-size: 14px;
            color: #444;
            margin-bottom: 6px;
            display: block;
          }

          .signup-input {
            width: 100%;
            padding: 12px 15px;
            border-radius: 10px;
            border: 1px solid #e0c8ff;
            background: #faf4ff;
            font-size: 14px;
            color: #4b2d78;
            outline: none;
          }

          .signup-input::placeholder {
            color: #b99cd1;
          }

          .signup-btn {
            width: 100%;
            padding: 12px;
            border-radius: 30px;
            border: none;
            background: #d500f9;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-top: 10px;
            box-shadow: 0px 5px 18px rgba(213, 0, 249, 0.35);
            transition: 0.3s ease-in-out;
          }

          .signup-btn:hover {
            transform: scale(1.05);
            background: #ff33f0;
            box-shadow: 0px 8px 25px rgba(255, 0, 255, 0.45);
          }
        `}
      </style>

      <div className="signup-bg">
        <div className="signup-card">

          <h1 className="signup-title">Create Account</h1>
          <p className="signup-sub">Start your learning journey</p>

          <form onSubmit={handleSignup}>
            <div className="signup-input-box">
              <label className="signup-label">Name</label>
              <input
                type="text"
                placeholder="👤 Enter your Name"
                className="signup-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="signup-input-box">
              <label className="signup-label">Password</label>
              <input
                type="password"
                placeholder="🔒 Enter your password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="signup-btn" type="submit">
              Sign In
            </button>
          </form>
          
        </div>
      </div>
    </>
  );
}
