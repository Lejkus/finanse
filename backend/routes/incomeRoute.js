const express = require("express");
const router = express.Router();


router.get("/",(req, res) => {
  console.log(req.userid);
  res.send("5000zł");
});

module.exports = router