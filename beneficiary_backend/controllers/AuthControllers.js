const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const LoginAdmin = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Please enter complete credentials" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found with that info" });
    }

    const comparedPassword = bcrypt.compare(password, user.password);

    if (comparedPassword === false) {
      return res.status(404).json({ message: "Invalid Email Or Password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {expiresIn: '5d'});
    res.status(200).json({message: "user successfully loged In ", data: {"token": token, "admin": user }})
  } catch (err) {
    res.status(500).json({message: err})
  }
};

module.exports = {
    LoginAdmin
}