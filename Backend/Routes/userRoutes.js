const express = require("express");
const {
  signup,
  signin,
  getUser,
  logout,
} = require("../controllers/userControllers.js");
const jwtAuth = require("../middlewares/authenticateUser.js");

const signupMiddleware = require("../middlewares/signUpDataValidate.js");
const loginMiddleware = require("../middlewares/loginDataValidate.js");


const router = express.Router();

router.post("/signup", signupMiddleware , signup);

router.post("/signin", loginMiddleware, signin);

router.get("/", jwtAuth, getUser);

router.get("/logout", jwtAuth, logout);

module.exports = router;
