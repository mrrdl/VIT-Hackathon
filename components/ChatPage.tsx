"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User, UserIcon as UserMd } from "lucide-react"

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "doctor" | "patient" }>>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []) // Updated useEffect dependency

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "patient" }])
      setInput("")
      // Simulate doctor's response (replace with actual backend integration)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for your message. How can I help you today?", sender: "doctor" },
        ])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Chat with Your Doctor</h1>
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
              className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className={`flex items-start ${message.sender === "patient" ? "flex-row-reverse" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`rounded-full p-2 ${message.sender === "patient" ? "bg-blue-500" : "bg-green-500"}`}
                >
                  {message.sender === "patient" ? (
                    <User className="text-white" size={24} />
                  ) : (
                    <UserMd className="text-white" size={24} />
                  )}
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`max-w-xs mx-2 p-3 rounded-lg ${
                    message.sender === "patient" ? "bg-blue-100" : "bg-white"
                  }`}
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

export default ChatPage

