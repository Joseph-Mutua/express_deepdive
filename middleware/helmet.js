const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet);
app.use(express.static("helmet"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.post("/ajax", (req, res) => {
  console.log(req);
  res.send("Mike Testing!!");
});

app.listen(3000);
