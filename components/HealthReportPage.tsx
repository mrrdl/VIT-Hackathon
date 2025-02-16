"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Filter, Download, Search, Eye } from "lucide-react"

const HealthReportPage: React.FC = () => {
  const [filter, setFilter] = useState("All")

  const reports = [
    { id: 1, title: "Annual Health Checkup", date: "2023-05-01", doctor: "Dr. Smith", type: "General" },
    { id: 2, title: "Blood Test Results", date: "2023-04-15", doctor: "Dr. Johnson", type: "Laboratory" },
    { id: 3, title: "X-Ray Report", date: "2023-03-22", doctor: "Dr. Williams", type: "Radiology" },
    { id: 4, title: "Dental Checkup", date: "2023-02-10", doctor: "Dr. Brown", type: "Dental" },
  ]

  const filteredReports = filter === "All" ? reports : reports.filter((report) => report.type === filter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4"
    >
      <h1 className="text-3xl font-bold mb-8">Health Reports & History</h1>

      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <Filter className="mr-2" />
          <select className="border rounded-md p-2" onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option>All</option>
            <option>General</option>
            <option>Laboratory</option>
            <option>Radiology</option>
            <option>Dental</option>
          </select>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search reports..." className="border rounded-md p-2 pl-8" />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <AnimatePresence>
        {filteredReports.map((report) => (
          <motion.div
            key={report.id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
          >
            <div className="flex items-center">
              <FileText className="text-blue-500 mr-4" size={24} />
              <div>
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-sm text-gray-600">Date: {report.date}</p>
                <p className="text-sm text-gray-600">Doctor: {report.doctor}</p>
                <p className="text-sm text-gray-600">Type: {report.type}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                <Download size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
              >
                <Eye size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default HealthReportPage

