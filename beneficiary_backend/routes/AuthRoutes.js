const express = require("express")
const router = express.Router()

const {LoginAdmin} = require("../controllers/AuthControllers")

router.post("/login", LoginAdmin)

module.exports = router