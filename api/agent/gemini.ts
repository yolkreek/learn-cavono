import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function POST(req: Request) {
  const data = await req.json();
  const content = data.content;
  const prompt = data.prompt;

  const answer = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: content,
    config: { systemInstruction: prompt },
    
  });

  return Response.json({ answer: answer.text });
}
