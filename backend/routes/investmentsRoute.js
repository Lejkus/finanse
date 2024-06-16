import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await prisma.income.findMany({
      where: {
        userId: req.userid,
      },
    });
    res.json({ succes: "succesfully get incomes ", data: data });
  } catch (error) {
    res.json({ error: error });
  }
});

router.post("/", async (req, res) => {
  const { title, type, buy_price, interest, amount } = req.body;

  if (type == "stock") {
  } else {
    try {
      await prisma.income.create({
        data: {
          title: title,
          buy_price: buy_price,
          interest: interest,
          amount:amount,
          userId: req.userid
        },
      });
      res.json({ succes: "succesfully add income " });
    } catch (error) {
      res.json({ error: error });
    }
  }
});

router.put("/", async (req, res) => {
  const { title, amount } = req.body;

  try {
    await prisma.income.update({
      where: {
        id: req.body.id,
      },
      data: {
        title: title,
        amount: amount,
      },
    });
    res.json({ succes: "succesfully change income " });
  } catch (error) {
    res.json({ error: error });
  }
});

router.delete("/", async (req, res) => {
  try {
    await prisma.income.delete({
      where: {
        id: req.body.id,
      },
    });
    res.json({ succes: "succesfully deleted income " });
  } catch (error) {
    res.json({ error: error });
  }
});

export default router;
