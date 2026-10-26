import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_KEY,
});

const stream = await ai.models.generateContentStream({
  model: "gemini-3.6-flash",
  contents:
    "hi this is gemini api test. are you getting my message? write a long text of your thought about apple vs orange",
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text ?? "");
}
