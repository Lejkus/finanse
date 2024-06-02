const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("5000zł");
});

module.exports = router