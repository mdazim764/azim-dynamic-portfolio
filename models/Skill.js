const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "Programming"
  items: { type: [String], required: true }, // e.g., ["C", "C++", "Python", "Java"]
});

module.exports = mongoose.model("Skill", skillSchema);
