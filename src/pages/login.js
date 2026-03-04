import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      localStorage.setItem("username", data.username);
      navigate("/chat");
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <style>
        {`
          .login-bg {
            height: 100vh;
            background: #f8eaff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Poppins', sans-serif;
            padding: 20px;
          }

          .login-card-home {
            width: 480px;
            background: white;
            padding: 50px 45px;
            border-radius: 25px;
            box-shadow: 0px 10px 30px rgba(200,0,255,0.15);
            text-align: center;
          }

          .login-title {
            font-size: 48px;
            font-weight: 800;
            color: #d500f9;
            margin-bottom: 8px;
          }

          .login-subtitle {
            font-size: 18px;
            color: #6e5d8c;
            margin-bottom: 35px;
          }

          .input-box-home {
            width: 100%;
            margin-bottom: 18px;
            text-align: left;
          }

          .input-label {
            font-size: 14px;
            color: #444;
            margin-bottom: 6px;
            display: block;
          }

          .login-input-home {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #e0c8ff;
            background: #faf4ff;
            border-radius: 10px;
            font-size: 14px;
            outline: none;
            color: #4b2d78;
          }

          .login-input-home::placeholder {
            color: #b99cd1;
          }

          .login-btn-home {
            width: 100%;
            padding: 12px;
            background: #d500f9;
            color: white;
            border: none;
            border-radius: 30px;
            font-size: 20px;
            cursor: pointer;
            margin-top: 20px;
            box-shadow: 0px 5px 18px rgba(213,0,249,0.35);
            transition: 0.3s ease;
          }

          .login-btn-home:hover {
            transform: scale(1.05);
            background: #ff33f0;
            box-shadow: 0px 8px 25px rgba(255,0,255,0.45);
          }
        `}
      </style>

      <div className="login-bg">
        <div className="login-card-home">

          <h1 className="login-title">Welcome Back!</h1>
          <p className="login-subtitle">Login to your account to continue</p>

          <div className="input-box-home">
            <label className="input-label">Name</label>
            <input
              type="text"
              placeholder="👤 Enter your name"
              className="login-input-home"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box-home">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="🔒 Enter your password"
              className="login-input-home"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn-home" onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}
