const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studyworld")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const ollamaResponse = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: message,
        stream: false
      })
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama responded with status ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();

    res.json({ reply: data.response });

  } catch (err) {
    console.error("Ollama error:", err.message);
    res.status(500).json({ error: "Ollama server error: " + err.message });
  }
});

