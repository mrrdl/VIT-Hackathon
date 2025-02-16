"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Activity, Calendar, TrendingUp, Heart, Droplet, Weight } from "lucide-react"

const DashboardPage: React.FC = () => {
  const healthMetrics = [
    { name: "Heart Rate", value: "72 bpm", icon: Heart, color: "text-red-500" },
    { name: "Blood Pressure", value: "120/80 mmHg", icon: Activity, color: "text-blue-500" },
    { name: "Blood Sugar", value: "95 mg/dL", icon: Droplet, color: "text-purple-500" },
    { name: "Weight", value: "70 kg", icon: Weight, color: "text-green-500" },
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Health Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{metric.name}</h2>
              <metric.icon className={`${metric.color}`} size={24} />
            </div>
            <p className="text-3xl font-bold">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Health Trends</h2>
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <TrendingUp size={48} className="text-blue-500" />
          <span className="ml-2 text-lg">Placeholder for health trends chart</span>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
        <ul className="space-y-4">
          {[
            { doctor: "Dr. Smith", specialty: "Cardiologist", date: "2023-05-15", time: "10:00 AM" },
            { doctor: "Dr. Johnson", specialty: "Dermatologist", date: "2023-05-22", time: "2:30 PM" },
          ].map((appointment, index) => (
            <motion.li
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Calendar className="text-blue-500 mr-4" size={24} />
              <div>
                <p className="font-semibold">
                  {appointment.doctor} - {appointment.specialty}
                </p>
                <p className="text-sm text-gray-600">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">AI Health Recommendations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Increase daily water intake to 8 glasses
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Add 30 minutes of moderate exercise to your routine
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Consider incorporating more leafy greens into your diet
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            Practice stress-reduction techniques like meditation
          </motion.li>
        </ul>
      </motion.div>
    </div>
  )
}

export default DashboardPage

