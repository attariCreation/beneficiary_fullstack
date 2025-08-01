const mongoose = require("mongoose")
const beneficiarySchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  purpose: { type: String, required: true },
  status: { type: String, default: 'New' },
  history: { type: Array, default: [] }
}, { timestamps: true });
module.exports = mongoose.model("BeneficiarySeeker", beneficiarySchema)