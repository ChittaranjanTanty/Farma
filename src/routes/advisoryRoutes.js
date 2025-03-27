const express = require("express");
const { generateAdvisoryController } = require("../controllers/advisoryController");

const router = express.Router();

router.post("/", generateAdvisoryController);

module.exports = router;
