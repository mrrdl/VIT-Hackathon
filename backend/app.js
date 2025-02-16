const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/healthcare";
const JWT_SECRET = process.env.JWT_SECRET || "jwwwwwww";

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Patient Schema
const patientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Patient = mongoose.model("Patient", patientSchema);

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Doctor = mongoose.model("Doctor", doctorSchema);

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Common Login Route
const loginUser = async (Model, req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Patient Routes
app.post("/api/patient/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let patient = await Patient.findOne({ email });
    if (patient) return res.status(400).json({ message: "User already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    patient = new Patient({ email, password: hashedPassword });
    await patient.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/patient/login", (req, res) => loginUser(Patient, req, res));

app.get("/api/patient/dashboard", authenticate, async (req, res) => {
  const patient = await Patient.findById(req.user.id).select("-password");
  res.json(patient);
});

// Doctor Routes
app.post("/api/doctor/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let doctor = await Doctor.findOne({ email });
    if (doctor) return res.status(400).json({ message: "User already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    doctor = new Doctor({ email, password: hashedPassword });
    await doctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/doctor/login", (req, res) => loginUser(Doctor, req, res));

app.get("/api/doctor/dashboard", authenticate, async (req, res) => {
  const doctor = await Doctor.findById(req.user.id).select("-password");
  res.json(doctor);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
