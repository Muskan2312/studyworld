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

  const llamaPrompt = `<|system|>
You are a helpful assistant. Always answer in English.
</s>
<|user|>
${message}
</s>
<|assistant|>
`;

  try {
    const llamaResponse = await fetch("http://127.0.0.1:8081/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: llamaPrompt,
        n_predict: 200
      })
    });

    const data = await llamaResponse.json();

    res.json({
      reply: data.content   
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Llama server error" });
  }
});

