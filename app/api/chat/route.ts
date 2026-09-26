import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
    });

    return NextResponse.json({
      reply: response.text || "MahiAI ko koi response nahi mila.",
    });
  } catch (error) {
  console.error("Gemini error:", error);

  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
}