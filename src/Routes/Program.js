
const router = require("express").Router();
const ProgramController = require("../controllers/Program");

router.get("/", ProgramController.read);
router.post("/favorite/:program_id", ProgramController.favorite);
router.delete("/favorite/:program_id", ProgramController.delete);

module.exports = router; 