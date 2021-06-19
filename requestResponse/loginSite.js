const path = require("path");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parses data from forms as http messages

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.send("Sanity check!!");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  //Req.body is made by url encoded, which passes the http message for sent data
  const { password, username } = req.body;

  //Check the db to see if user credentials are valid
  //If they are valid,
  //save their username in a cookie
  //Send them to the welcome page

  //Cookie data is stored entirely on the browser and the browser will send it
  //upto the server everytime a request is made

  //Session data is stored on the server and the browser is given
  // a key for that data, Sessions are not inbuilt in express

  if (password == "x") {
    //Res.cookie takes 2 args: name of cookie and value to set it to
    //Res.redirect gets on e arg on where to send browser

    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    res.redirect("/login?msg=fail");
  }
  //res.json(req.body);
});

app.get("/welcome", (req, res, next) => {
  //req.cookies object will have a property for every named cookie that has been set

  res.render("welcome", {
    username: req.cookies.username,
  });
});

app.get("/logout", (req, res, next) => {
  //res.clearCookietakes 1 arg: the cookie to clear by name
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
