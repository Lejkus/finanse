const express = require("express");
const cookieParser = require("cookie-parser");

const income = require("./routes/incomeRoute")
const login = require("./controllers/login")
const dotenv = require("dotenv")

const Auth = require("./middlewares/Auth")

const app = express();

app.use(express.json())
app.use(cookieParser());

dotenv.config()

const port = 3000;

app.get("/", (req, res) => {
  res.send("siema");  
});

app.use('/income',Auth,income)

app.post('/login',login)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
