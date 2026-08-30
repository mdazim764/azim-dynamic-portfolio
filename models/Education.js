const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true }, // e.g., "M.Tech (CSE)"
  institute: { type: String, required: true }, // e.g., "IIT Patna"
  duration: { type: String, required: true }, // e.g., "2026 - Present"
  grade: { type: String }, // e.g., "CGPA: 7.35" (Optional)
  docUrl: { type: String },
});

module.exports = mongoose.model("Education", educationSchema);
