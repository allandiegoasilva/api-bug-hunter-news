
const express = require("express"); 
const router = express.Router(); 

const controller = require("../controllers/UserPlatform");
const CheckParams = require("../middlewares/checkParams/userPlatform/CreateCheck");

const UserPlatformCheckCreate = require("../middlewares/userPlatform/Create"); 
const PlatformCheckId = require("../middlewares/platform/CheckId");

router.get("/", controller.read);
router.get("/:platform_id", controller.read); 

router.post("/create", CheckParams, PlatformCheckId, UserPlatformCheckCreate, controller.create);

router.put("/update", CheckParams, PlatformCheckId, controller.update);

router.delete("/:platform_id", PlatformCheckId, controller.delete);

module.exports = router; 