import express from 'express'

const router = express.Router();
router.get("/",(req, res) => {
  console.log(req.userid);
  res.send("4 500 000 zł");
});

export default router