

const router = require("express").Router();

const UserAuthenticated = require("../Middlewares/UserAuthenticated");
const ProgramController = require("../Controller/Program");

router.get("/", UserAuthenticated, ProgramController.getAll);

module.exports = router; 