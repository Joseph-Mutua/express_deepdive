const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");

app.use(helmet());
app.use(express.static("public"));

//Parse JSON AND URLENCODED data into req.body
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res, next) => {
  // res.json({
  //     msg: "Hulablaloooooo!"
  // })

  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
