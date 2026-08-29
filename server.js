// 1. IMPORTING TOOLS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 2. INITIALIZING APP & MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

// 3. DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Database Successfully!"))
  .catch((error) => console.log("❌ MongoDB Connection Error: ", error));

// ==========================================
// 🛡️ THE BOUNCER (Authentication Middleware)
// ==========================================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res
      .status(403)
      .json({ message: "Access Denied! No VIP Wristband!" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired Wristband!" });
  }
};

// ==========================================
// 🌟 SENIOR DEV TRICK: DYNAMIC MODEL MATCHER
// ==========================================
// We map the URL words to your actual model files
const models = {
  projects: require("./models/Project"),
  education: require("./models/Education"),
  experience: require("./models/Experience"),
  skills: require("./models/Skill"),
  achievements: require("./models/Achievement"),
  courses: require("./models/Course"),
  profile: require("./models/Profile"),
};

// This function intercepts the request and figures out WHICH model to use
const attachModel = (req, res, next) => {
  const type = req.params.collectionName; // grabs the word from the URL
  const Model = models[type];

  if (!Model) {
    return res.status(404).json({ message: `Model '${type}' not found!` });
  }

  req.Model = Model; // Attach the correct blueprint to the request
  next(); // Move on to the actual API route
};

// ==========================================
// 4. CREATING ROUTES (APIs)
// ==========================================

// --- LOGIN ROUTE ---
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token, message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Wrong password!" });
  }
});

// --- PUBLIC: READ ALL (GET) ---
// Example URL: http://localhost:5000/api/education
app.get("/api/:collectionName", attachModel, async (req, res) => {
  try {
    const data = await req.Model.find(); // Uses whichever model we attached
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// --- PROTECTED: CREATE (POST) ---
app.post("/api/:collectionName", verifyToken, attachModel, async (req, res) => {
  try {
    const newItem = new req.Model(req.body);
    await newItem.save();
    res.json({ message: "Item added successfully!", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error saving item", error });
  }
});

// --- PROTECTED: UPDATE (PUT) - THIS IS NEW! ---
// We pass the specific ID in the URL to tell it exactly what to edit
app.put(
  "/api/:collectionName/:id",
  verifyToken,
  attachModel,
  async (req, res) => {
    try {
      // Find by ID and Update it. 'new: true' tells Mongo to return the updated version to us.
      const updatedItem = await req.Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      res.json({ message: "Item updated successfully!", data: updatedItem });
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error });
    }
  },
);

// --- PROTECTED: DELETE (DELETE) ---
app.delete(
  "/api/:collectionName/:id",
  verifyToken,
  attachModel,
  async (req, res) => {
    try {
      await req.Model.findByIdAndDelete(req.params.id);
      res.json({ message: "Item deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  },
);

// 5. STARTING THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running live on http://localhost:${PORT}`);
});
