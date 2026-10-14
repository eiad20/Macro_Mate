# NutriGen
TDEE calculator + AI diet planner (React, TypeScript, Tailwind, Gemini).

## Run
1. `npm install`
2. Copy `.env.example` to `.env` and paste your Gemini API key (free at https://aistudio.google.com/apikey)
3. `npm run dev` and open the URL it prints (usually http://localhost:5173)

The TDEE calculator works without a key; only "Generate AI Diet Plan" and "Swap this meal" need it.
Restart `npm run dev` after editing `.env`. Optional: set `VITE_GEMINI_MODEL` in `.env` to use a different model.
