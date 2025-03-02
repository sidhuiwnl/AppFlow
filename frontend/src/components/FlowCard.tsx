import {GitBranch,Workflow,Code,FileCode,Beer} from "lucide-react";


export default function FlowCard(){
    return (
        <div className="bg-gradient-to-br from-neutral-900 to-black rounded-xl p-8   border border-gray-800">
            <div className="flex items-center mb-6">
                <GitBranch className="w-6 h-6 mr-3 text-white" />
                <h2 className="text-xl font-semibold">How It Works</h2>
            </div>
            <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                    <div className="bg-black rounded-full p-1.5 mr-3 mt-0.5 border border-gray-800">
                        <Beer className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-400">Enter your GitHub repository URL</span>
                </li>
                <li className="flex items-start">
                    <div className="bg-black rounded-full p-1.5 mr-3 mt-0.5 border border-gray-800">
                        <Code className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-400">We analyze your codebase structure</span>
                </li>
                <li className="flex items-start">
                    <div className="bg-black rounded-full p-1.5 mr-3 mt-0.5 border border-gray-800">
                        <Workflow className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-400">Generate beautiful, interactive flowcharts</span>
                </li>
                <li className="flex items-start">
                    <div className="bg-black rounded-full p-1.5 mr-3 mt-0.5 border border-gray-800">
                        <FileCode className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-400">Export as SVG, PNG or embed in your docs</span>
                </li>
            </ul>

        </div>
    )
}