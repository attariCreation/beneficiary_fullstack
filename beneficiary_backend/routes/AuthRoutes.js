const express = require("express")
const router = express.Router()
const auth = require("../middlewares/authMiddleware")
const {LoginAdmin, createAccountByAdmin, getAccounts, deleteAccount} = require("../controllers/AuthControllers")

router.post("/login", LoginAdmin)
router.post("/staff", auth('admin'), createAccountByAdmin)
router.get('/staff', auth('admin'), getAccounts)
router.delete("/staff/:id", auth('admin'), deleteAccount)

module.exports = router