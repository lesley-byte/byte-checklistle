const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema(
  {
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
      validate: {
        validator: function (values) {
          return values.every((val) => !mongoose.Types.ObjectId.isValid(val));
        },
        message: "conditionValue should not contain ObjectId",
      },
      default: [],
    },
  },
  { _id: false }
); // set _id option to false to exclude the _id field

module.exports = stepSchema;
