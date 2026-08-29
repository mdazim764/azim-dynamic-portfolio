const mongoose = require("mongoose");

// 1. Defining the Blueprint (Schema)
// This tells MongoDB exactly what a "Project" should look like.
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  technologies: { type: [String], required: true }, // Array of strings (like ["React", "Node"])
});

// 2. Exporting the Model so our server.js can use it
module.exports = mongoose.model("Project", projectSchema);
