const express = require("express");
const income = require("./routes/incomeRoute")

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("siema");
});

app.use('/income',income)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
