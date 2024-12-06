const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const JWT_SECRATE ="secratBoy";
const fetchDetails = require('../middleware/FetchUser')


// for post data 
router.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("phone", "Enter a valid phone").isLength({ min: 10 }),
    body("age", "Enter a valid age").isInt({ min: 1 }),
    body("password", "Password must be at least 8 characters long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry, a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRATE);
    console.log("Auth Token:", authToken);
    res.json({ authToken });

    try {
      // Any additional code, if needed
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);


// for login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }).select("+password"); // Fetch the password explicitly
      if (!user) {
        return res.status(400).json({ error: "Please use correct email and password" });
      }
    
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please use correct email and password" });
      }
    
      const payload = {
        user: {
          _id: user._id,
        },
      };
      const authTokenNew = jwt.sign(payload, JWT_SECRATE);
      console.log("Auth Token (Login):", authTokenNew);
      res.json({ authTokenNew });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);







// getuserdetails



// Get user details
router.post(
  "/getUser",
  fetchDetails,
  async (req, res) => {
    try {
      let userid = req.user.id;
      const userDetails = await User.findById(userid).select("-password");
      res.send(userDetails);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
