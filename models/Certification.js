const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
  link: { type: String }, // Drive/PDF Link
});

module.exports = mongoose.model("Certification", certificationSchema);
