//file that the server runs through

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
//start server in terminal with command: node index.s
