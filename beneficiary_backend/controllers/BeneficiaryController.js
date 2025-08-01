const BeneficiarySeeker = require("../models/BeneficiarySchema");

const createBeneficiary = async (req, res) => {
  //   const cnic = req.body.cnic;
  //   const data = await BeneficiarySeeker.findOne({ cnic });
  //   if (data)
  //     return res
  //       .status(409)
  //       .json({ message: "beneficiary Already exists", data: req.body });

  try {
    const newBeneficiary = new BeneficiarySeeker(req.body);
    await newBeneficiary.save();
    res.status(200).json({
      message: "beneficiary created successfully",
      beneficiaryToken: newBeneficiary._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      const duplicatedField = Object.keys(err.keyPattern)[0]; // e.g., 'email'
      return res.status(409).json({
        message: `a data with this property already exists: ${duplicatedField}`,
        field: duplicatedField,
      });
    }

    res.status(500).json({ message: "An error occurred", error: err });
  }
};
const getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await BeneficiarySeeker.find();
    res.status(200).json(beneficiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBeneficiariesById = async (req, res) => {
  try {
    const beneficiary = await BeneficiarySeeker.findById(req.params.id);
    if (!beneficiary)
      return res
        .status(404)
        .json({
          message: "no beneficiary found by this Id",
          Id: req.params.id,
        });

    res.status(200).json({ message: "beneficiary Found", beneficiary });
  } catch (err) {
    res.status(500).json({ message: "an error occured", err });
  }
};
const updateBeneficiary = async (req, res) => {
  try {
    const updated = await BeneficiarySeeker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "no beneficairy found with that data !" });

    res
      .status(200)
      .json({ message: "Beneficiary updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteBeneficiary = async (req, res) => {
  try {
    const deleted = await BeneficiarySeeker.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Beneficiary not found" });
    res.status(200).json({ message: "Beneficiary deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createBeneficiary,
  getAllBeneficiaries,
  getBeneficiariesById,
  updateBeneficiary,
  deleteBeneficiary,
};
