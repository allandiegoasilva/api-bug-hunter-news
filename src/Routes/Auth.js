

const dotenv = require("dotenv");
const express = require("express"); 
const router = express.Router(); 

const controller = require("../Controller/Auth");

router.get("/", controller.verify)



module.exports = router; 
