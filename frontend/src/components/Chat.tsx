

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { Coffee, MessageSquare, Send, Bot } from "lucide-react"

interface Message {
    role: "user" | "system" | "website"
    message: string
}



export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([])
    const [textAreaValue, setTextAreaValue] = useState<string>("")
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])



    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.target.value)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!textAreaValue.trim()) return

        const userMessage: Message = { role: "user", message: textAreaValue }
        setMessages((prev) => [...prev, userMessage])
        setTextAreaValue("")

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/file/talk`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: textAreaValue }),
            })
            const data = await response.json()
            if (data.success !== false) {
                const botMessage: Message = { role: "system", message: data.data }
                setMessages((prev) => [...prev, botMessage])
            }
        } catch (error) {
            console.error("Error fetching response:", error)
        }
    }



    return (
        <div className="flex flex-col h-screen bg-neutral-900 text-white">
            <header className="flex justify-between items-center p-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    <h1 className="text-lg font-medium">AppFlow</h1>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 max-w-lg rounded-lg ${msg.role === "user" ? "bg-blue-500" : "bg-neutral-700"}`}>
                                <div className="text-sm font-medium mb-1 flex items-center gap-1">
                                    {msg.role === "system" && <Bot className="w-4 h-4" />}
                                    {msg.role === "user" ? "You" : "Chatbot"}
                                </div>
                                <div className="text-sm">{msg.message}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center pt-12 pb-8">
                        <div className="flex items-center gap-2 mb-12 text-3xl font-medium">
                            <Coffee className="w-8 h-8" />
                            <h2>Good Evening!</h2>
                        </div>
                        <div>
                            <p>Chat with the bot to understand your desired codebase</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t flex justify-center  border-neutral-800">
                <form onSubmit={onSubmit} className="relative  max-w-4xl w-[900px]">
                    <Textarea placeholder="Type your message here" className="resize-none bg-white bg-opacity-5 border-neutral-800 rounded-lg focus:ring-0 text-black placeholder-neutral-400 p-3 pr-12 min-h-[60px]" value={textAreaValue} onChange={handleTextAreaChange} rows={1} />
                    <Button type="submit" size="sm" className="absolute right-3 bottom-3 bg-transparent border-none bg-neutral-800">
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
