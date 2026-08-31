import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not configured.");
}

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "app.js"));
});
app.post("/api/generate", async (req, res) => {
  try {
    const {
      topic = "",
      genre = "Drama",
      platform = "TikTok",
      duration = "60 seconds",
      style = "Cinematic",
      characters = ""
    } = req.body;

    if (!topic.trim()) {
      return res.status(400).json({ error: "Please enter a topic." });
    }

    const prompt = `Create an original short-form video script.

Topic: ${topic}
Genre: ${genre}
Platform: ${platform}
Duration: ${duration}
Style: ${style}
Characters: ${characters || "Create suitable characters"}

Return:
1. A strong hook for the first 3-5 seconds.
2. Scene-by-scene script with approximate timing.
3. Natural dialogue and/or voiceover.
4. Visual and camera direction for each scene.
5. A memorable ending.
6. A platform-appropriate CTA only when it fits.

Keep the pacing engaging and make the script practical for an AI-video creator. Do not include copyrighted song lyrics or copy an existing creator's script.`;

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: prompt
    });

    res.json({ script: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Generation failed. Check your API key and try again."
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Script Generator running at http://localhost:${process.env.PORT || 3000}`);
});
