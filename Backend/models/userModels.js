const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxLength: [30, "name must be less than 30 characters"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      maxLength: [30, "username must be less than 30 characters"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      maxLength: [60, "Bio must be less than 30 characters"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already in use"],
      lowecase: true,
      maxLength: [30, "email must be less than 30 characters"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "password is required"],
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  generateAuthToken() {
    const token = JWT.sign(
      { _id: this._id, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return token;
  },
};

module.exports = mongoose.model("User", userSchema);
