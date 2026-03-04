import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("username") || "User";
  const userName = storedName;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(
    localStorage.getItem(`notes_${userName}`) || ""
  );
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`notes_${userName}`, notes);
    alert("Notes Saved 💜");
  };

  const handleClearNotes = () => {
    localStorage.removeItem(`notes_${userName}`);
    setNotes("");
  };

  // ⭐ UPDATED FOR OLLAMA (port 5001 + question field)
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userInput },
    ]);

    // Call your backend (which calls Ollama)
    const response = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // ⭐ Changed message → question
      body: JSON.stringify({ question: userInput }),
    });

    const data = await response.json();

    // Add assistant reply
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.reply },
    ]);

    setUserInput("");
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: linear-gradient(135deg, #fdf4ff, #fae8ff);
        }

        .navbar {
          height: 75px;
          width: 100%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          position: fixed;
          top: 0;
          z-index: 1000;
          box-shadow: 0 6px 20px rgba(168,85,247,0.15);
        }

        .navbar-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(90deg, #a855f7, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-right-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-username {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 16px;
          color: #a855f7;
          cursor: pointer;
          padding: 10px 18px;
          border-radius: 25px;
          background: #fae8ff;
          white-space: nowrap;
        }

        .dropdown {
          position: absolute;
          top: 60px;
          right: 0;
          background: white;
          padding: 12px 18px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .logout-btn {
          color: #a855f7;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }

        .logout-btn:hover {
          background: #f3e8ff;
          border-radius: 8px;
        }

        .layout {
          display: flex;
          gap: 25px;
          padding: 95px 30px 30px 30px;
          height: 100vh;
          box-sizing: border-box;
        }

        .book-panel, .chat-panel {
          flex: 1.5;
          background: white;
          border-radius: 28px;
          box-shadow: 0 30px 60px rgba(168,85,247,0.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .book-panel {
          padding: 20px 35px;
        }

        .book-header {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #a855f7;
        }

        .dropdown-books {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #f3e8ff;
          height: 40px;
          font-size: 14px;
          margin-bottom: 8px;
        }

        iframe {
          width: 100%;
          height: calc(100vh - 280px);
          margin-top: 10px;
          border-radius: 18px;
          border: none;
        }

        .messages {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .msg-row { margin-bottom: 18px; display: flex; }
        .msg-user { justify-content: flex-end; }

        .bubble {
          padding: 14px 20px;
          border-radius: 20px;
          max-width: 75%;
          font-size: 15px;
        }

        .bubble-user {
          background: linear-gradient(135deg, #d8b4fe, #f9a8d4);
          color: white;
        }

        .bubble-bot {
          background: #f3e8ff;
          color: #4c1d95;
        }

        .input-area {
          display: flex;
          padding: 22px;
          border-top: 1px solid #f3e8ff;
          background: #fdf4ff;
        }

        .input-box {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          background: transparent;
          color: #a855f7;
        }

        .send-btn {
          padding: 12px 26px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #f472b6, #a855f7);
          color: white;
          cursor: pointer;
        }
      `}</style>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="navbar-title">Smart Learning Assistant</div>

        <div className="navbar-right-wrapper">
          <div
            onClick={() => setShowNotes(!showNotes)}
            style={{
              padding: "8px 16px",
              borderRadius: "25px",
              background: "#fae8ff",
              color: "#a855f7",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            📝 Notes
          </div>

          <div
            className="navbar-username"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {userName} ▾
          </div>

          {menuOpen && (
            <div className="dropdown">
              <div className="logout-btn" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>

      {/* NOTES POPUP */}
      {showNotes && (
        <div
          style={{
            position: "fixed",
            top: "110px",
            right: "60px",
            width: "360px",
            background: "white",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 20px 40px rgba(168,85,247,0.25)",
            zIndex: 2000,
          }}
        >
          <h3 style={{ color: "#a855f7" }}>My Notes</h3>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: "100%",
              height: "180px",
              borderRadius: "12px",
              border: "1px solid #f3e8ff",
              padding: "10px",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleSaveNotes}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "#a855f7",
                color: "white",
                border: "none",
              }}
            >
              Save
            </button>

            <button
              onClick={handleClearNotes}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "#f472b6",
                color: "white",
                border: "none",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="layout">
        <div className="book-panel">
          <div className="book-header">📚 Select NCERT Textbook</div>

          <select
            className="dropdown-books"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">-- Choose Textbook --</option>
            <option value="combined_6">Class 6 - English</option>
            <option value="combined_7">Class 7 - English</option>
            <option value="combined_8">Class 8 - English</option>
            <option value="science_6">Class 6 - Science</option>
            <option value="science_7">Class 7 - Science</option>
            <option value="science_8">Class 8 - Science</option>
          </select>

          {selectedBook && (
            <iframe
              src={`/textbooks/${selectedBook}.pdf`}
              title="NCERT Textbook"
            />
          )}
        </div>

        <div className="chat-panel">
          <div className="messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg-row ${m.role === "user" ? "msg-user" : ""}`}
              >
                <div
                  className={`bubble ${
                    m.role === "user" ? "bubble-user" : "bubble-bot"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              className="input-box"
              placeholder="Ask something from the textbook..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />

            <button className="send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}