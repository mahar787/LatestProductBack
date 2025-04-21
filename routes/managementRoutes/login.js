const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.post("/", (req, res) => {
  try {
    let data = req.body;
    if (data.email === "owner@shop.com" && data.password === "adminShop001") {
      const token = jwt.sign(data.email, process.env.JWT_SECRET);
      res.status(200).json({ allowLogin: true, token });
      return;
    } else {
      res
        .status(400)
        .json({ allowLogin: false, message: "Invalid credentials!" });
      return;
    }
  } catch (error) {
    console.log("Error in login admin", error);
  }
});
module.exports = router;
