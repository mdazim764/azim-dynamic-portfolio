const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // Hero Section
  name: { type: String, required: true }, // "Azim Khairdi"
  eyebrow: { type: String, required: true }, // "M.Tech CSE @ IIT Patna..."
  heroSubtitle: { type: String, required: true }, // "Software Engineer building..."
  heroLead: { type: String, required: true }, // "I work across backend..."

  // Quick Snapshot Panel
  currentProgram: { type: String, required: true },
  specialization: { type: String, required: true },

  // Text Sections
  aboutText: { type: String, required: true }, // Your "About Me" paragraph(s)
  contactIntro: { type: String, required: true }, // "I am currently focused on..."

  // Contact & Links
  emailAcademic: { type: String }, // "azim_2611cs05@iitp.ac.in"
  emailPersonal: { type: String }, // "khairdimdazim@gmail.com"
  phone: { type: String }, // "+91 8600836379"
  github: { type: String }, // "https://github.com/mdazim764"
  linkedin: { type: String }, // "https://www.linkedin.com/..."
});

module.exports = mongoose.model("Profile", profileSchema);
