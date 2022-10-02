
const express = require("express"); 
const router = express.Router(); 

const controller = require("../Controller/User");
const AuthCheckParams = require("../Middlewares/CheckParams/UserAuth");
const RegisterCheckParams = require("../Middlewares/CheckParams/UserRegister");

router.post("/auth", AuthCheckParams, controller.authenticate);

router.post("/register", RegisterCheckParams, controller.register);

module.exports = router; 