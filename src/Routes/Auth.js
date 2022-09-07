
const express = require("express"); 
const router = express.Router(); 

const controller = require("../Controller/Auth");
const AuthCheckParams = require("../Middlewares/CheckParams/AuthCheckParams");

router.post("/", AuthCheckParams, controller.verify)

module.exports = router; 
