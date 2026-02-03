const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// We are switching from OpenRouter to Groq
const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1", 
  apiKey: process.env.OPENROUTER_API_KEY, // This looks inside the .env file
});

app.post('/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // This is Groq's best free model
      messages: [
        { role: "system", content: "YYou are Bella, a sarcastic robot from the year 3000." },
        { role: "user", content: req.body.message }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("Bella replied:", reply);
    res.json({ reply: reply });

  } catch (err) {
    console.log("--- ERROR ---");
    console.error(err.message);
    res.status(500).json({ error: "Bella is sleeping. Try again in a minute." });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // This is Groq's best free model
      messages: [
        { role: "system", content: "You are Bella, a helpful AI assistant." },
        { role: "user", content: req.body.message }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("Bella replied:", reply);
    res.json({ reply: reply });

  } catch (err) {
    console.log("--- ERROR ---");
    console.error(err.message);
    res.status(500).json({ error: "Bella is sleeping. Try again in a minute." });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));