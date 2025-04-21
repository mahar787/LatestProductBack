const express = require("express");
const { Additional } = require("../../models/additionals.model.js");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    let additionals = await Additional.find({});
    res.status(200).json({ data: additionals });
  } catch (error) {
    console.log("Error in fetching additionals", error);
  }
});

module.exports = router;
