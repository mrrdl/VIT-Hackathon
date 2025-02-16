const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Patient = require("../models/patientModel");

// Patient Login Route
router.post("/auth", async (req, res) => {
    const { email, password, isRegister } = req.body;
  
    try {
      let patient = await Patient.findOne({ email });
      
      if (isRegister) {
        // Registration Logic
        if (patient) {
          return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        patient = new Patient({ email, password: hashedPassword });
        await patient.save();
        return res.status(201).json({ message: "Patient registered successfully" });
      }
      
      // Login Logic
      if (!patient) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: patient._id }, "your_secret_key", { expiresIn: "1h" });
      res.json({ token, patient: { email: patient.email } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
