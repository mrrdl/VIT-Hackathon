"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Star } from "lucide-react"

const FindDoctorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const specialties = ["Cardiology", "Dermatology", "Neurology", "Orthopedics", "Pediatrics"]

  const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiology", rating: 4.8 },
    { id: 2, name: "Dr. Emily Johnson", specialty: "Dermatology", rating: 4.9 },
    { id: 3, name: "Dr. Michael Brown", specialty: "Neurology", rating: 4.7 },
    { id: 4, name: "Dr. Sarah Davis", specialty: "Orthopedics", rating: 4.6 },
    { id: 5, name: "Dr. David Wilson", specialty: "Pediatrics", rating: 4.9 },
  ]

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty === "" || doctor.specialty === selectedSpecialty),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find a Doctor & Book Appointment
      </motion.h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for doctors"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
            <p className="text-gray-600 mb-2">{doctor.specialty}</p>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span>{doctor.rating}</span>
            </div>
            <motion.button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="inline-block mr-2" size={16} />
              Book Appointment
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FindDoctorPage

