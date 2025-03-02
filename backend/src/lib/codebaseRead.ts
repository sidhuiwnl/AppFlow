import {model} from "../controllers/modal";

export async function getGeminiResponse(prompt : string) : Promise<string> {
    try {
        const sequenceSum = await model.generateContent(prompt,)

        return sequenceSum.response.text();
    }catch(err){
        return "Error getting gemini response";
    }
}



export async function getSequenceDiagram(repomixFinal: string) {
    const prompt = `Generate a well-structured and **consistent** Mermaid sequence diagram representing the workflow of the given codebase.

The file is: ${repomixFinal}

**Processing Rules:**
- Extract relevant content **between "Directory Structure" and "End of Codebase"** sections.
- **Ignore** README.md and other non-code files (like .gitignore, config files).
- **Group related components** to improve readability.

### **Diagram Requirements:**
1. Use **ONLY** Mermaid's **sequenceDiagram** syntax.
2. Identify **key components** (files, modules, services) as participants.
3. Show **logical grouping** where applicable (e.g., "API Layer", "Database Layer").
4. Represent the **complete sequence of interactions** with correct arrows (->>, -->, ->).
5. **Use activation boxes** (activate/deactivate) where necessary.
6. Add **short, meaningful notes** to clarify dependencies.
7. Represent **import relationships** and **data flow** explicitly.
8. Ensure **runtime behavior and initialization sequence** is clear.
9. **Break down** the diagram into manageable sections if it becomes too large.



### **Output Format:**
- Provide **ONLY** the Mermaid sequence diagram **inside a code block** (\`\`\`mermaid ... \`\`\`).
- **Do NOT** include any explanations, comments, or extra text.`;

    const response = await getGeminiResponse(prompt);
    return response;
}

export async function cleanSequenceCode(sequenceCode : string){
    const cleanCode = sequenceCode.replace("```mermaid","").replace("```","").trim();

    return cleanCode;
}