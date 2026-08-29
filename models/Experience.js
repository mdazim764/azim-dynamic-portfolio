const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true }, // e.g., "Sciqus Infotech Pvt. Ltd."
  role: { type: String, required: true }, // e.g., "Trainee Software Engineer"
  durationMeta: { type: String, required: true }, // e.g., "Remote / India | Feb 2025 - Aug 2025"
  bullets: { type: [String], required: true }, // Array of tasks/achievements
});

module.exports = mongoose.model("Experience", experienceSchema);
