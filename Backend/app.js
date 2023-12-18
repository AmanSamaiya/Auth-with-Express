const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes.js");
const connectToDb = require("./config/db.js");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use("/", userRoutes);

module.exports = app;
