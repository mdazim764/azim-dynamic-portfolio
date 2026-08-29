const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "1st Position - Smart India Hackathon"
  description: { type: String, required: true }, // e.g., "Won INR 1 Lakh cash prize."
  year: { type: String, required: true }, // e.g., "2019"
});

module.exports = mongoose.model("Achievement", achievementSchema);
