const { Schema } = require("mongoose");

const stepSchema = new Schema({
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
    required: false,
  },
});

module.exports = stepSchema;
