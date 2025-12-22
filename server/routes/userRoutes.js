const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getUsers } = require("../controllers/userController");
const {
  createUserValidation,
  updateUserValidation,
  protect,
  loginValidation,
} = require("../validations/user.validation.js");
const { validate } = require("../middlewares/validate.js");
const tokens = require("../utils/token.js");
// @route   GET /api/users
// @desc    Get all users
// @access  Public
 

router.get("/dashboard", protect, getUsers);

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/register", createUserValidation, validate, async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   console.log("Registering user:", { name, email, hashedPassword });
  try {
    let user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/update/:id", updateUserValidation, validate, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Build update object
    const updateData = {
      name,
      email,
    };

    // Only update password if it is provided and not empty
    if (password && password.trim() !== "") {
      updateData.password = password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password"); // don't return password

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Edit User Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/login", (req, res) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return res.json({ loggedIn: true });
  }
});

router.post("/login", loginValidation, validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Correct comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = tokens.generateAccessToken(user);
    const refreshToken = tokens.generateRefreshToken(user);

      res.json({
        accessToken,
        refreshToken,
      });
      

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;

 
