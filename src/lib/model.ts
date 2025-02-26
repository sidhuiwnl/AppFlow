import {GoogleGenerativeAI} from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API)

export const modal = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });





