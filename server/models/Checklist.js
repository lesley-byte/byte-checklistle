const { Schema, model } = require("mongoose");
const stepSchema = require("./Step");

const checklistSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  steps: [stepSchema],
});

const Checklist = model("Checklist", checklistSchema);

module.exports = Checklist;
