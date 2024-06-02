const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth")

router.get("/",Auth,(req, res) => {
  res.send("5000zł");
});

module.exports = router