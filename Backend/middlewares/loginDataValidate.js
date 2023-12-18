const bcrypt = require("bcrypt");
const User = require("../models/userModels.js");

const loginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.find({ username }).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    if (user) {
      const result = bcrypt.compare(password, user[0].password);

      if (!result) {
        res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }

      req.user = user;
      next();
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = loginMiddleware;
