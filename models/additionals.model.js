const mongoose = require("mongoose");
const additionalsSchema = new mongoose.Schema({
  deliveryCharges: {
    type: Number,
    default: 250,
  },
  accountHolderName: {
    type: String,
    default: null,
  },
  accountNumber: {
    type: String,
    default: null,
  },
  IBAN: {
    type: String,
    default: null,
  },
  //   accountNumberEasyPaisa: {
  //     type: String,
  //     default: null,
  //   },
  //   accountNumberJazzCash: {
  //     type: String,
  //     default: null,
  //   },
  //   accountHolderJazzCash: {
  //     type: String,
  //     default: null,
  //   },
  //   accountHolderEasyPaisa: {
  //     type: String,
  //     default: null,
  //   },
  perProductCharges: {
    type: String,
    default: null,
  },
});
const Additional = mongoose.model("Additional", additionalsSchema);
module.exports = { Additional };
