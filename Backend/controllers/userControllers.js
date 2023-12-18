const bcrypt = require("bcrypt");
const User = require("../models/userModels.js");
const emailValidator = require("email-validator");

const saltRounds = 10;

exports.signup = async (req, res) => {
  const { name, username, bio, email, password } = req.user;

  try {
    var validateEmail = emailValidator.validate(email);

    if (!validateEmail) {
      res.status(400).json({msg:"Invalid email"})
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({msg:"User already exists"})
    }

    var hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      username,
      bio,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } 
  catch (error) {
    res.status(400).json({ success: false, message: error});
  }
};

exports.signin = async (req, res) => {
  try {
    const user = req.user;

    const token = user[0].generateAuthToken();
    user.password = undefined;

    const cookieoptions = {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: 'none',
      secure: true
    };
  
    
    res.cookie("token", token, cookieoptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const cookieoptions = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieoptions);
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
