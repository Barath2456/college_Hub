const express = require("express");
const { compareColleges } = require("../controllers/compareController");

const router = express.Router();

router.post("/", compareColleges);

module.exports = router;
