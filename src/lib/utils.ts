import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {modal} from "@/lib/model.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  function cleanMermaid(mermaidCode : string){

  let cleanCode = mermaidCode.replace("```mermaid","").replace("```","").trim();

  const graphTypes = ["graph TD","graph LR","graph TB","graph BT","graph RL"]

  for(const graphType of graphTypes){
    if(graphTypes.includes(graphType) && graphType !== "graph TD"){
      cleanCode = cleanCode.replace(graphType,"")
    }
  }

  cleanCode = "graph TD\n" + cleanCode


  let lines = cleanCode.split("\n")
  let fixedLines = lines.map((line) => {
    if(line.includes("subgraph") && !line.includes(']')){
      return line.replace("subgraph","subgraph") + ' ['
    }

    return line
  })
  cleanCode += fixedLines.join("\n")



  return cleanCode

}

export async function getModelResponse(prompt : string){
  try {


    const result = await modal.generateContent(prompt)

    return result.response.text()
  }catch(err){
    console.log(err)
  }
}


export async function generateMermaidCode(description : string){
  const prompt = `Generate a Mermaid diagram code for a workflow based on the following description:

Description: ${description}

Please provide only the Mermaid code that represents this workflow. Use 'graph TD' for a top-down flowchart. Avoid using subgraphs unless specifically requested. Keep the syntax simple.

Mermaid code:`

  let response = await getModelResponse(prompt);
  if(!response){
    return "Error while generating model response"
  }

  let finalResponse = cleanMermaid(response)

  if(finalResponse) return finalResponse


}