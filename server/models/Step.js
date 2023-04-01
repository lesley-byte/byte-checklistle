const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: mongoose.Types.ObjectId,
    },
    text: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    conditionType: {
      type: String,
      required: false,
    },
    conditionValue: {
      type: [String],
      default: [],
    },
  },
  { _id: true } // Change _id: false to _id: true
);

module.exports = stepSchema;
