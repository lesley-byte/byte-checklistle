const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  checklists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Checklist",
    },
  ],
});

const User = model("User", userSchema);
module.exports = User;