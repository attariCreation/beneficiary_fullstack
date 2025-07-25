const express = require("express")
const router = express.Router()

const AuthRoutes = require("./AuthRoutes")

router.use('/api/admin', AuthRoutes)

module.exports = router