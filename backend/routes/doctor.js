const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

// MongoDB Schema for Doctor Login
const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

// Doctor Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: doctor._id }, "your_secret_key", { expiresIn: "1h" });
    res.json({ token, doctor: { email: doctor.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Doctor Registration Route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    doctor = new Doctor({ email, password: hashedPassword });
    await doctor.save();

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
