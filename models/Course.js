const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Data Structures and Algorithms"
});

module.exports = mongoose.model("Course", courseSchema);
