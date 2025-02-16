"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FileText, MessageSquare, Activity, Search, Shield, Heart, Zap } from "lucide-react"
import Link from "next/link"

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: "Health Reports",
      description: "Access your medical history with ease",
      link: "/health-report",
    },
    { icon: MessageSquare, title: "AI Chat", description: "Get instant medical advice from our AI", link: "/ai-chat" },
    {
      icon: Activity,
      title: "Health Dashboard",
      description: "Monitor your health metrics in real-time",
      link: "/dashboard",
    },
    {
      icon: Search,
      title: "Find Doctors",
      description: "Search and book appointments with top doctors",
      link: "/find-doctor",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1
            className="text-6xl font-bold mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            Welcome to BHAI
          </motion.h1>
          <motion.p
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Blockchain-based Healthcare & AI
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 text-gray-800 shadow-lg transform hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.8, type: "spring" }}
            >
              <Link href={feature.link}>
                <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
                <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
                <p>{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link href="/login" passHref>
            <motion.button
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center">
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Shield size={64} />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Secure</h2>
            <p>Your medical data is protected by blockchain technology</p>
          </div>
          <div className="text-center">
            <motion.div
              className="inline-block mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart size={64} />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Patient-Centric</h2>
            <p>Designed with your health and convenience in mind</p>
          </div>
          <div className="text-center">
            <motion.div
              className="inline-block mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap size={64} />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Innovative</h2>
            <p>Leveraging AI and blockchain for better healthcare</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage

