import express from "express";
import cookieParser from "cookie-parser";
import incomeRoute from "./routes/incomeRoute.js";
import loginController from "./controllers/login.js";
import dotenv from "dotenv";
import Auth from "./middlewares/Auth.js";
import deleteRecentTokens from "./functions/deleteOldTokens.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

const port = 3000;


// setInterval(function() {
//   deleteRecentTokens()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// }, 20*1000);




app.get("/", (req, res) => {
  res.send("siema");
});

app.use('/income', Auth, incomeRoute);

app.post('/login', loginController);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
