const express = require("express");
const income = require("./routes/incomeRoute")
const login = require("./controllers/login")
const dotenv = require("dotenv")



const app = express();

app.use(express.json())
dotenv.config()

const port = 3000;

app.get("/", (req, res) => {
  res.send("siema");  
});

app.use('/income',income)

app.post('/login',login)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
