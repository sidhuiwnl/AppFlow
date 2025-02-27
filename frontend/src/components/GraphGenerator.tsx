import mermaid from "mermaid";
import {useEffect} from "react";

mermaid.initialize({
    startOnLoad : true,
    theme: "default"
})


export default function GraphGenerator({
    diagramCode
                                       } : {
    diagramCode: string
}){
    useEffect(() => {
        mermaid.contentLoaded();
    }, []);

    const code = `${diagramCode}`;

    return (
        <div className="mermaid h-52 w-full">
            {code}
        </div>
    )
}