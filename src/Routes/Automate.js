
const router = require("express").Router();
const ProgramController = require("../controllers/Automate");

router.post("/:program_id", ProgramController.automate);
router.get("/", ProgramController.read);

module.exports = router; 