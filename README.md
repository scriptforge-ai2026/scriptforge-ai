# ScriptForge AI — Mobile Script Generator

## 1. Install
Run:
npm install

## 2. Add your API key
Copy `.env.example` to `.env` and put your existing OpenAI API key in `OPENAI_API_KEY`.
Never put the key in `public/` or commit `.env` to Git.

## 3. Start
npm start

Then open:
http://localhost:3000

## Features
- Mobile-first UI
- Topic, genre, platform, duration, style, and character inputs
- Scene-by-scene script generation
- Copy button
- API key stays server-side

The app uses the OpenAI Responses API and the `gpt-5.6-luna` model.
