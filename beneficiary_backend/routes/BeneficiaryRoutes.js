const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createBeneficiary,
  getAllBeneficiaries,
  getBeneficiariesById,
  updateBeneficiary,
  deleteBeneficiary,
} = require("../controllers/BeneficiaryController");

// create
router.post("/beneficiary", auth("admin"), createBeneficiary);
// read
router.get("/beneficiary", auth("admin"), getAllBeneficiaries);
// read single
router.get("/beneficiary/:id", auth("admin"), getBeneficiariesById);
// update
router.patch("/beneficiary/:id", auth("admin"), updateBeneficiary);
router.delete("/beneficiary/:id", auth("admin"), deleteBeneficiary);

module.exports = router;
