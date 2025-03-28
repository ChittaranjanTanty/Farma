const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

router.post("/content", contentController.generateContent);

module.exports = router;
