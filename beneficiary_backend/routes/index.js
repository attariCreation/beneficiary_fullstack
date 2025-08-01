const express = require("express")
const router = express.Router()
const AuthRoutes = require("./AuthRoutes")
const BeneficiaryRoutes = require("./BeneficiaryRoutes")
router.use('/api/admin', AuthRoutes)
router.use('/api/admin', BeneficiaryRoutes)
module.exports = router