import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async(req, res) => {
  try {
    const data = await prisma.spending.findMany({
      where: {
        userId: req.userid
      },
    });
    res.json({ succes: "succesfully get spendings ", data: data });
  } catch (error) {
    res.json({ error: error });
  }
});

router.post("/", async (req, res) => {
  const {title, amount} = req.body

  try {
    await prisma.spending.create({
      data: {
        title: title,
        amount: amount,
        userId: req.userid,
      },
    });
    res.json({ succes: "succesfully add spending " });
  } catch (error) {
    res.json({ error: error });
  }
});

router.put("/", async (req, res) => {
  const {title, amount} = req.body

  try {
    await prisma.spending.update({
      where: {
        id: req.body.id,
      },
      data: {
        title: title,
        amount: amount,
      },
    })
    res.json({ succes: "succesfully change spending " });
  } catch (error) {
    res.json({ error: error });
  }
});

router.delete("/", async(req, res) => {
  try {
    await prisma.spending.delete({
      where: {
        id: req.body.id,
      },
    })
    res.json({ succes: "succesfully deleted spending " });
  } catch (error) {
    res.json({ error: error });
  }
});

export default router;
