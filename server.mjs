import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { question } = req.body;

  console.log("Received:", question);

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3:1b",
      prompt: question
    })
  });

  let output = "";
  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = new TextDecoder().decode(value);

    try {
      const json = JSON.parse(chunk);
      if (json.response) output += json.response;
    } catch {}
  }

  console.log("Output:", output);

  res.json({ reply: output });
});

app.listen(5001, () => {
  console.log("🔥 API running at http://localhost:5001/chat");
});