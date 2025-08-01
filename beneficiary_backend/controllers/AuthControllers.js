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
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    res.status(200).json({
      message: "user successfully loged In ",
      data: { token: token, admin: user },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const getAccounts = async (req, res) => {
  try {
    const accounts = await User.find({
      role: { $in: ["staff", "receptionist"] },
    });

    res.status(200).json({ message: "here are the accounts", data: accounts });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
const deleteAccount = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: "No userId provided" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `User ${deletedUser.name} has been deleted` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createAccountByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["staff", "receptionist"].includes(role)) {
      return res
        .status(404)
        .json({ message: "invalid role, must select receptionist or staff" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(200).json({
      message: "new User created sucesfully." + `${role} account created`,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message:
        "might be a server error, please try again or contact with developers !",
    });
  }
};

module.exports = {
  LoginAdmin,
  createAccountByAdmin,
  getAccounts,
  deleteAccount
};
