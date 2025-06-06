import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.google_ai_key });

export const gemini = async (contents) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });

    return response;
  } catch (error) {
    console.log("🚀 ~ generateContent ~ error:", error);
  }
};
