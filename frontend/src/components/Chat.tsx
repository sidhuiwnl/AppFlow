import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
    role: "user" | "system" | "website";
    message: string;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [textAreaValue, setTextAreaValue] = useState<string>("");

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!textAreaValue.trim()) return;

        const userMessage: Message = { role: "user", message: textAreaValue };
        setMessages((prev) => [...prev, userMessage]);
        setTextAreaValue("");

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/file/talk`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: textAreaValue }),
            });
            const data = await response.json();
            if (data.success !== false) {
                const systemMessage: Message = { role: "system", message: data.data };
                setMessages((prev) => [...prev, systemMessage]);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    const renderAvatar = (role: string) => {
        if (role === "user") {
            return (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
            );
        } else if (role === "website") {
            return (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                    </svg>
                </div>
            );
        } else {
            return (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 10-1.69 14.13A8.25 8.25 0 006.262 6.072z" />
                        <path d="M12.75 18.75h-1.5v-1.5h1.5v1.5zM12.75 16.5h-1.5v-4.5h1.5v4.5z" />
                    </svg>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900 text-white">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 ?messages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-3 mb-4">
                        {renderAvatar(msg.role)}
                        <div className="flex flex-col w-full max-w-4xl">
                            <div className="text-sm font-medium mb-1">
                                {msg.role === "user"
                                    ? "You"
                                    : msg.role === "website"
                                        ? "Website"
                                        : "System"}
                            </div>
                            <div className="text-sm">
                                {msg.message}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col h-full justify-center items-center">
                        <div className="text-center text-gray-500">
                            <p className="text-lg font-medium">Welcome to AI Chat</p>
                            <p className="text-sm">Send a message to start the conversation</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-black">
                <form onSubmit={onSubmit} className="relative">
                    <Textarea
                        placeholder="Enter your question..."
                        className="resize-none bg-neutral-900 border-none rounded focus:ring-0 text-white placeholder-gray-400 p-3 pr-12"
                        value={textAreaValue}
                        onChange={handleTextAreaChange}
                        rows={1}
                    />
                    <Button
                        type="submit"
                        size="sm"
                        className="absolute right-3 bottom-3 bg-neutral-900 border-none hover:bg-neutral-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </Button>
                </form>
            </div>
        </div>
    );
}