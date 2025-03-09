import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import {useNavigate} from "react-router";


export default function Main(){
    const navigate = useNavigate();
    const[githubUrl, setGithubUrl] = useState<string>("");

    async function handleSequenceCode(){

        if (!githubUrl.trim()) {
            toast.error("Please enter a valid GitHub URL or repository.");
            return;
        }

        toast.message("Processing your requested codebase");

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/file/remoteUrl`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                remoteUrl : githubUrl,
                prompt : prompt,
            })
        })

        const data = await response.json();

        if(data.status === "success"){
            toast.success(data.data);
            navigate("/chat")
        }else{
            toast.error(data.data);
        }

    }

    return (
        <div className="flex flex-col justify-center items-center py-20 space-y-4 h-screen ">
            <h1 className="text-6xl font-medium">AppFlow</h1>
            <p className="text-2xl font-medium">Add your codebase and talk with it to understand the working.</p>
            <label htmlFor={"github"}>Github URl or user/repo</label>
            <div className="flex space-x-4 ">
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
                    onClick={handleSequenceCode}
                    className="h-10"
                >
                     Generate
                        </Button>
            </div>

        </div>
    )
}