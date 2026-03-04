import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <>
      <style>
        {`
        .btn-login {
          padding: 10px 28px;
          background: transparent;
          border: 2px solid #ff00e6;
          border-radius: 10px;
          color: #ff00e6;
          font-size: 20px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn-login:hover {
          background: rgba(255, 0, 230, 0.15);
          box-shadow: 0 0 12px #ff00e6;
          transform: scale(1.05);
        }

        .btn-signup {
          padding: 10px 28px;
          background: #ff00e6;
          border-radius: 10px;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn-signup:hover {
          background: #ff33f0;
          box-shadow: 0 0 15px #ff00e6;
          transform: scale(1.07);
        }

        .notes-area {
          width: 100%;
          height: 300px;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #e0c8ff;
          background: #faf4ff;
          font-size: 16px;
          outline: none;
          resize: none;
          color: #4b2d78;
        }

        .notes-area::placeholder {
          color: #b99cd1;
        }
        `}
      </style>

      {/* Background */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          background: "#f8eaff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontFamily: "Poppins, sans-serif",
        }}
      >

        {/* Main Card */}
        <div
          style={{
            width: "95%",
            maxWidth: "1300px",
            height: "90vh",
            background: "white",
            borderRadius: "25px",
            padding: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 5px 20px rgba(200,0,255,0.15)",
          }}
        >

          {/* LEFT SECTION / IMAGE */}
          <div style={{ width: "50%", paddingLeft: "30px" }}>
            <img
              src="/image/image.png"
              alt="Online Education"
              style={{ width: "100%", maxWidth: "480px" }}
            />
          </div>

          {/* RIGHT SECTION */}
          <div style={{ width: "50%" }}>

            {/* NAVBAR */}
            <div
              style={{
                display: "flex",
                gap: "40px",
                fontSize: "22px",
                marginBottom: "40px",
                color: "#666",
                cursor: "pointer"
              }}
            >
              <span
                style={{
                  borderBottom: !showNotes ? "3px solid #d500f9" : "none"
                }}
                onClick={() => setShowNotes(false)}
              >
                HOME
              </span>

              <span
                style={{
                  borderBottom: showNotes ? "3px solid #d500f9" : "none"
                }}
                onClick={() => setShowNotes(true)}
              >
                NOTES
              </span>
            </div>

            {/* CONDITIONAL RENDERING */}
            {!showNotes ? (
              <>
                <h1
                  style={{
                    fontSize: "60px",
                    fontWeight: "800",
                    color: "#5d3fd3",
                    marginBottom: "25px",
                  }}
                >
                  Smart Textbook
                </h1>

                <p
                  style={{
                    fontSize: "18px",
                    color: "#666",
                    maxWidth: "480px",
                    lineHeight: "1.6",
                    marginBottom: "40px",
                  }}
                >
                  Learn anytime, anywhere. Your smart study companion is here
                  to help you explore, grow, and achieve your academic goals.
                </p>

                <div style={{ display: "flex", gap: "20px" }}>
                  <Link to="/login-signup">
                    <button className="btn-login">Login</button>
                  </Link>

                  <Link to="/signup">
                    <button className="btn-signup">Sign In</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1
                  style={{
                    fontSize: "40px",
                    fontWeight: "700",
                    color: "#5d3fd3",
                    marginBottom: "20px",
                  }}
                >
                  📒 My Notes
                </h1>

                <textarea
                  className="notes-area"
                  placeholder="✍️ Start writing your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

