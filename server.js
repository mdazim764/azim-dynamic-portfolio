// 1. IMPORTING TOOLS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // <--- NEW: Import JWT toolkit
require("dotenv").config();

const Project = require("./models/Project");

const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Database Successfully!"))
  .catch((error) => console.log("❌ MongoDB Connection Error: ", error));

// ==========================================
// 🛡️ THE BOUNCER (Authentication Middleware)
// ==========================================
const verifyToken = (req, res, next) => {
  // 1. Check if they have a wristband (token) in their headers
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Access Denied! No VIP Wristband!" });
  }

  // 2. The header usually looks like "Bearer [token_string]". We split it to get just the token.
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token using our secret signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next(); // ✅ Wristband is valid! Let them through to the API.
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired Wristband!" });
  }
};

// ==========================================
// 4. CREATING ROUTES (APIs)
// ==========================================

// --- NEW ROUTE: LOGIN (Get the wristband) ---
app.post("/api/login", (req, res) => {
  const { password } = req.body;

  // Check if the typed password matches the one in our .env file
  if (password === process.env.ADMIN_PASSWORD) {
    // Issue the VIP Wristband (Token) valid for 1 hour
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Wrong password!" });
  }
});

// --- PUBLIC ROUTE (No Bouncer Needed) ---
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

// --- PROTECTED ROUTE (Requires the Bouncer / verifyToken) ---
app.post("/api/projects", verifyToken, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error saving project", error });
  }
});

// --- PROTECTED ROUTE (Requires the Bouncer / verifyToken) ---
app.delete("/api/projects/:id", verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
});

// 5. STARTING THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}`);
});
