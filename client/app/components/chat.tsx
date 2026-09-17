"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  ArrowUp,
  Loader2,
  FileText,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

export interface IDocumentSource {
  id?: string;
  pageContent: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    pageNumber?: number;
    filename?: string;
    [key: string]: unknown;
  };
}

interface IMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  documents?: string[];
}

export const ChatComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Upload a PDF document to start asking questions about it.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async () => {
    const query = input.trim();
    if (!query || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: query },
    ]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      const params = new URLSearchParams({ message: query });
      const res = await fetch(
        `http://localhost:8000/chat?${params.toString()}`,
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log(data);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data.answer || "No relevant information found in the document.",
          documents: Array.isArray(data.source)
            ? data.source
            : data.source
              ? [data.source]
              : [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Failed to get an answer. Make sure the backend server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-50 dark:bg-[#0B0C0E] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Simple Header */}
      <header className="h-12 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between shrink-0 transition-colors">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 transition-colors">Document Chat</span>
        <button
          onClick={() =>
            setMessages([
              {
                id: "intro",
                role: "assistant",
                content:
                  "Upload a PDF document to start asking questions about it.",
              },
            ])
          }
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`relative text-sm transition-colors ${
                  msg.role === "user"
                    ? "bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 rounded-2xl px-4 py-2.5 max-w-[85%]"
                    : "w-full rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/60 p-4 text-zinc-800 dark:text-zinc-300 shadow-sm dark:shadow-none"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>

                {msg.role === "assistant" && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 transition-colors">
                    {msg.documents && msg.documents.length > 0 ? (
                      <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <FileText className="w-3 h-3" />
                        <span>
                          {msg.documents.length} source reference
                          {msg.documents.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-zinc-500 py-2 transition-colors">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Searching document...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 shrink-0 transition-colors">
        <div className="max-w-3xl mx-auto flex items-end border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/60 px-3 py-2 focus-within:border-zinc-400 dark:focus-within:border-zinc-700 transition-colors shadow-sm dark:shadow-none">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask a question about the document..."
            className="w-full bg-transparent resize-none text-sm text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-500 focus:outline-none leading-relaxed py-1"
            disabled={loading}
          />

          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className="p-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 disabled:opacity-30 transition-all ml-2 shrink-0"
            title="Send"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
