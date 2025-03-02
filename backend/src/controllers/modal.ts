import dotenv from "dotenv";

dotenv.config()


import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API as string);
export const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash" ,
    generationConfig :{
        temperature : 0,
        topK: 40,
        topP: 0.9
    }
});

