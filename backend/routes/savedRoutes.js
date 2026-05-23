const express = require("express");
const { toggleSaveCollege, getSavedColleges } = require("../controllers/savedController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Protect all saved college endpoints
router.use(authMiddleware);

router.post("/save/:collegeId", toggleSaveCollege);
router.get("/saved", getSavedColleges);

module.exports = router;
