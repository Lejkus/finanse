import express from 'express'

const router = express.Router();
router.get("/",(req, res) => {
  console.log(req.userid);
  res.send("5000zł");
});

export default router