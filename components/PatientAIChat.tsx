"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Bot } from "lucide-react"

const PatientAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "ai" }>>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []) // Updated useEffect dependency

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      setInput("")
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "I'm an AI assistant. How can I help you today?", sender: "ai" }])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">AI Health Assistant</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className={`flex items-start ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`rounded-full p-2 ${message.sender === "user" ? "bg-blue-500" : "bg-green-500"}`}
                >
                  {message.sender === "user" ? (
                    <User className="text-white" size={24} />
                  ) : (
                    <Bot className="text-white" size={24} />
                  )}
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`max-w-xs mx-2 p-3 rounded-lg ${message.sender === "user" ? "bg-blue-100" : "bg-white"}`}
                >
                  <p>{message.text}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            <Send size={24} />
          </motion.button>
        </div>
      </footer>
    </div>
  )
}

export default PatientAIChat

