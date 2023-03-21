const { Schema, model } = require("mongoose");
const stepSchema = require("./Step");

const checklistSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  steps: [stepSchema],
});

const Checklist = model("Checklist", checklistSchema);

module.exports = Checklist;