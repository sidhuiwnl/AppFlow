import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";

import MermaidVisualizer from "@/components/MermaidVisualizer.tsx";

export default function Main(){
    const[githubUrl, setGithubUrl] = useState<string>("");
    const[diagramCode,setDiagramCode] = useState<string>("");

    async function getSequenceCode(){
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/file/remoteUrl`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                remoteUrl : githubUrl,
            })
        })

        const data = await response.json();
        setDiagramCode(data.message)

    }
    console.log(diagramCode)
    return (
        <div className="flex flex-col justify-center items-center py-20 space-y-4 ">
            <h1 className="text-6xl font-medium">AppFlow</h1>
            <p className="text-2xl font-medium">Generate stunning Flowcharts for your projects effortlessly.</p>
            <label htmlFor={"github"}>Github URl or user/repo</label>
            <div className="flex space-x-4">
                <Input
                    name="github"
                    id="github"
                    placeholder="GitHub Url or user/repo"
                    className="w-[700px] h-10 border border-neutral-700 rounded-lg"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()

                        setGithubUrl(e.currentTarget.value)
                    }}
                    value={githubUrl}
                />
                <Button
                    onClick={getSequenceCode}
                    className="h-10"
                >
                    Generate</Button>
            </div>
            {
                diagramCode ?
                    <MermaidVisualizer diagramCode={diagramCode}/> : null
            }


        </div>
    )
}