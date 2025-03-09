import {model} from "../controllers/modal";
import * as fs from "node:fs";

export async function getTxtData(prompt: string){

    const fileContent = fs.readFileSync("repomix-output.txt", "utf8");
    const base64Data = Buffer.from(fileContent).toString("base64");

    const systemPrompt = `You are an AI assistant trained to provide precise and clear responses. 
    Follow these rules when answering:
    - Keep responses concise and to the point.
    - Avoid unnecessary details and focus only on relevant information.
    - Structure answers in bullet points or numbered lists when helpful.
    - Do not make assumptions; base your response strictly on the given data.`;

    const finalPrompt = `${systemPrompt}\n\nUser Query: ${prompt}`;

    const result  = await model.generateContentStream([
        {
            inlineData : {
                data : base64Data,
                mimeType : "text/plain"
            }
        },
       finalPrompt

    ])

    let response = ""

    for await (const chunk of result.stream){
        const chunkText = chunk.text();
        response += chunkText;
    }

    return response;
}



