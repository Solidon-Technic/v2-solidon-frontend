"use client"

import { useState, useRef, useEffect, useId } from "react"
import { getChatGreeting, sendChatMessage } from "@lib/data/chatbot"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionId = useId()

  // Fetch greeting when chatbot opens for the first time
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setIsLoading(true)
      getChatGreeting()
        .then((response) => {
          const greetingMessage: Message = {
            id: `${sessionId}-greeting`,
            role: "assistant",
            content: response.message.content,
          }
          setMessages([greetingMessage])
          setHasGreeted(true)
        })
        .catch(() => {
          // Silently fail - user can still chat
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isOpen, hasGreeted, sessionId])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `${sessionId}-${Date.now()}`,
      role: "user",
      content: input.trim(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Filter out the greeting message for API calls
      const chatMessages = updatedMessages
        .filter((m) => m.id !== `${sessionId}-greeting`)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }))

      const response = await sendChatMessage(chatMessages)

      const assistantMessage: Message = {
        id: `${sessionId}-${Date.now()}-assistant`,
        role: "assistant",
        content: response.message.content,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `${sessionId}-${Date.now()}-error`,
        role: "assistant",
        content: "Ne pare rău, ceva nu a funcționat. Te rugăm să încerci din nou.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Închide Asistent AI" : "Deschide Asistent AI"}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-space_indigo px-5 py-3 text-white shadow-lg transition-all duration-300 hover:bg-space_indigo-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-space_indigo-500 focus:ring-offset-2"
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <>
            <SparklesIcon />
            <span className="text-sm font-medium">Asistent AI</span>
          </>
        )}
      </button>

      {/* Chat popup */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex w-[360px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ${isOpen
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
          }`}
        style={{ height: "500px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-space_indigo px-4 py-3 text-white">
          <SparklesIcon />
          <div>
            <h2 className="text-sm font-semibold">Asistent AI</h2>
            <p className="text-xs text-space_indigo-800">Întreabă-mă orice</p>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-dusty_grape">
              <SparklesIcon className="mb-3 h-10 w-10 opacity-50" />
              <p className="text-sm">Cu ce te pot ajuta astăzi?</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${message.role === "user"
                      ? "bg-space_indigo text-white"
                      : "bg-white text-grey-80 shadow-sm"
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 shadow-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-dusty_grape" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-dusty_grape delay-75" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-dusty_grape delay-150" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-grey-20 bg-white p-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrie mesajul tău..."
            className="flex-1 rounded-lg border border-grey-20 px-3 py-2 text-sm text-grey-80 placeholder:text-grey-40 focus:border-space_indigo focus:outline-none focus:ring-1 focus:ring-space_indigo"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-space_indigo text-white transition-colors hover:bg-space_indigo-600 focus:outline-none focus:ring-2 focus:ring-space_indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  )
}

function SparklesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  )
}
