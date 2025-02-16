"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, FileText, MessageSquare, Activity, LogOut, Search, Send } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FileText, label: "Health Report", href: "/health-report" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Activity, label: "Dashboard", href: "/dashboard" },
  { icon: Search, label: "Find Doctor", href: "/find-doctor" },
  { icon: Send, label: "Send Records", href: "/send-records" },
]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.nav
        className="w-64 bg-white shadow-lg"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600 mb-8">BHAI</h1>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  <motion.div
                    className={`flex items-center p-2 rounded-lg cursor-pointer ${
                      pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.label}
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <motion.button
            className="flex items-center justify-center w-full p-2 rounded-lg bg-red-500 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </motion.button>
        </div>
      </motion.nav>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

export default Layout

