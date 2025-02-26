import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";

export default function Main(){
    const[githubUrl, setGithubUrl] = useState<string>("");

    console.log(githubUrl);
    return (
        <div className="flex flex-col justify-center items-center py-20 space-y-4">
            <h1 className="text-6xl font-medium">AppFlow</h1>
            <p className="text-2xl font-medium">Generate stunning Flowcharts for your projects effortlessly.</p>
            <label htmlFor={"github"}>Github URl or user/repo</label>
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
        </div>
    )
}