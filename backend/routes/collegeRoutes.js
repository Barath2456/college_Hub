const express = require("express");
const { getColleges, getCollegeById, createCollege } = require("../controllers/collegeController");

const router = express.Router();

router.get("/", getColleges);
router.get("/:id", getCollegeById);
router.post("/", createCollege);

module.exports = router;
