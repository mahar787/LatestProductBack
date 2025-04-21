const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.post("/", (req, res) => {
  try {
    let data = req.body;
    if (!data.token) {
      res.status(400).json({ authorization: false });
      return;
    }
    // owner@shop.com
    // adminShop001;
    let mail = jwt.verify(data.token, process.env.JWT_SECRET);
    if (mail === "owner@shop.com") {
      res.status(200).json({ authorization: true });
      return;
    } else {
      res.status(400).json({ authorization: false });
      return;
    }
  } catch (error) {
    console.log("Error in verify login admin", error);
  }
});
module.exports = router;
