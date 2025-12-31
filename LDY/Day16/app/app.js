const express = require("express");
const bodyParse = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", home);

module.exports = app;
