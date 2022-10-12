
const express = require("express"); 
const router = express.Router(); 

const UserPlatform = require("./UserPlatform")

const controller = require("../controllers/User");
const AuthCheckParams = require("../middlewares/checkParams/user/AuthCheck");
const RegisterCheckParams = require("../middlewares/checkParams/user/RegisterCheck");

router.post("/auth", AuthCheckParams, controller.authenticate);
router.post("/register", RegisterCheckParams, controller.register);

module.exports = router; 