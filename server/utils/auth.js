const jwt = require("jsonwebtoken");

const secret = "your-secret-key"; // Replace with your own secret key

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  signToken,
};
