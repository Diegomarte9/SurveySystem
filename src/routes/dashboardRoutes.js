const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "pages", "dashboard", "dashboard.html"));
});

module.exports = router;
