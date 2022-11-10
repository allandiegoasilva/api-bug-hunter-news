const dotenv = require("dotenv");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const StartRoutes = require("./src/Routes/index");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

StartRoutes(app);

app.listen(port, _ => console.log(`Server started at ${port}`));