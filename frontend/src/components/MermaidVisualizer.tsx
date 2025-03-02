
import { useEffect, useState, useRef } from "react"
import mermaid from "mermaid"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Download, Maximize2, Code, Eye, Copy, Check } from "lucide-react"


mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "Inter, sans-serif",
})


export default function MermaidVisualizer({
                                              diagramCode,
    setDiagramCode,
                                          }:{
    diagramCode:string,
    setDiagramCode : (textCode : string) => void
}) {

    const [svg, setSvg] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState("preview")
    const mermaidRef = useRef<HTMLDivElement>(null)


    const renderMermaid = async () => {
        try {
            setError(null)


            const { svg } = await mermaid.render("mermaid-diagram", diagramCode)

            setSvg(svg)
        } catch (err) {
            console.error("Mermaid rendering error:", err)
            setError("Error rendering diagram. Please check your syntax.")
        }
    }


    useEffect(() => {
        renderMermaid()
    }, [diagramCode])


    const exportAsSVG = () => {
        const svgBlob = new Blob([svg], { type: "image/svg+xml" })
        const svgUrl = URL.createObjectURL(svgBlob)
        const downloadLink = document.createElement("a")
        downloadLink.href = svgUrl
        downloadLink.download = "flowchart.svg"
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }


    const copyToClipboard = () => {
        navigator.clipboard.writeText(diagramCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col w-full h-full p-7">
            <Card className="border shadow-sm">
                {/*<CardHeader className="pb-4">*/}
                {/*    <CardTitle className="text-3xl font-bold">AppFlow</CardTitle>*/}
                {/*    <CardDescription>Generate stunning Flowcharts for your projects effortlessly.</CardDescription>*/}
                {/*</CardHeader>*/}

                <CardContent className="p-4">
                    <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <TabsList>
                                <TabsTrigger value="preview" className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    Preview
                                </TabsTrigger>
                                <TabsTrigger value="code" className="flex items-center gap-1">
                                    <Code className="h-4 w-4" />
                                    Code
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4 mr-1" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-1" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                                <Button size="sm" variant="outline" onClick={exportAsSVG}>
                                    <Download className="h-4 w-4 mr-1" />
                                    Export
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                            <Maximize2 className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl w-[90vw]">
                                        <DialogHeader>
                                            <DialogTitle>Flowchart Preview</DialogTitle>
                                        </DialogHeader>
                                        <div className="overflow-auto max-h-[80vh]">
                                            <div dangerouslySetInnerHTML={{ __html: svg }} />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <TabsContent value="preview" className="mt-0">
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 overflow-auto min-h-[500px] max-h-[600px]">
                                {error ? (
                                    <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">{error}</div>
                                ) : (
                                    <div ref={mermaidRef} className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="code" className="mt-0">
                            <Textarea
                                value={diagramCode}
                                onChange={(e) => setDiagramCode(e.target.value)}
                                className="font-mono text-sm min-h-[500px] max-h-[600px] resize-none"
                                placeholder="Enter your Mermaid code here..."
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex justify-between border-t px-6 py-4">

                    <Button onClick={() => setActiveTab(activeTab === "preview" ? "code" : "preview")}>
                        {activeTab === "preview" ? (
                            <>
                                <Code className="h-4 w-4 mr-2" />
                                Edit Code
                            </>
                        ) : (
                            <>
                                <Eye className="h-4 w-4 mr-2" />
                                View Preview
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
