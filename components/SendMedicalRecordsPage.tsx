"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { File, Send, Check } from "lucide-react"

const SendMedicalRecordsPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleSendRecords = async () => {
    setIsSending(true)
    // Simulate sending records using Ethereum (replace with actual implementation)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSending(false)
    setIsSent(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Send Medical Records
      </motion.h1>

      <motion.div
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Select Medical Records
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <File className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
              </div>
              <input id="file-upload" type="file" className="hidden" multiple onChange={handleFileChange} />
            </label>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Selected Files:</h2>
            <ul className="list-disc pl-5">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <motion.button
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
            isSending || isSent ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendRecords}
          disabled={isSending || isSent}
        >
          {isSending ? (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Sending...
            </motion.div>
          ) : isSent ? (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Check className="mr-2" size={20} />
              Sent Successfully
            </motion.div>
          ) : (
            <motion.div className="flex items-center justify-center">
              <Send className="mr-2" size={20} />
              Send Medical Records
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default SendMedicalRecordsPage

