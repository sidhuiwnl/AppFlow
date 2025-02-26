import {model} from "../controllers/modal";

export async function getGeminiResponse(prompt : string) : Promise<string> {
    try {
        const sequenceSum = await model.generateContent(prompt)

        return sequenceSum.response.text();
    }catch(err){
        return "Error getting gemini response";
    }
}

export async function getSequenceDiagram(repomixFinal : string){
    const prompt = `Generate a Mermaid sequence diagram code for a workflow based on the following description:

Description: ${repomixFinal}

Please provide only the Mermaid code that represents this workflow as a sequence diagram. Use 'sequenceDiagram' syntax instead of 'graph TD'. Show the interactions between different participants in the workflow. Keep the syntax simple.

Mermaid code:`;

    const sequenceCode   = getGeminiResponse(prompt);

    return sequenceCode;
}

export async function cleanSequenceCode(sequenceCode : string){
    const cleanCode = sequenceCode.replace("```mermaid","").replace("```","").trim();

    return cleanCode;
}