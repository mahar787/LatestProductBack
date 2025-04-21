const express = require("express");
const router = express.Router();
const { Additional } = require("../../models/additionals.model.js");
router.post("/", async (req, res) => {
  try {
    const {
      deliveryFee,
      accountHolderName,
      accountNumber,
      IBAN,
      //   easyPaisaName,
      //   easyPaisaNumber,
      //   jazzCashName,
      //   jazzCashNumber,
      perProductCharges,
    } = req.body;

    // Update the document if it exists, otherwise create a new one
    const updatedAdditional = await Additional.findOneAndUpdate(
      {}, // Match condition (empty to match any document)
      {
        deliveryCharges: deliveryFee,
        accountHolderName,
        accountNumber,
        IBAN,
        // accountNumberEasyPaisa: easyPaisaNumber,
        // accountNumberJazzCash: jazzCashNumber,
        // accountHolderEasyPaisa: easyPaisaName,
        // accountHolderJazzCash: jazzCashName,
        perProductCharges: perProductCharges,
      },
      { new: true, upsert: true } // Create if not exists, return updated document
    );

    res.status(200).json({ data: updatedAdditional });
  } catch (error) {
    console.log("Error in updating additionals", error);
  }
});

module.exports = router;
