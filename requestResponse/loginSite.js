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

app.use((req, res, next) => {
  //Send me onto the next piece of midlleware
  if (req.query.msg === "fail") {
    res.locals.msg = "Sorry, this username/password combination doesnt exist";
  } else {
    res.locals.msg = "";
  }

  //Send me onto the next piece of middleware!!
  next();
});

app.get("/", (req, res, next) => {
  res.send("Sanity check!!");
});

app.get("/login", (req, res, next) => {
  //the req object has a query property in express
  //req.query is an object with a property of every key in the query string

  //The query string is where you put insecure data, data that is of insignificance
  console.log(req.query);
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
    //The ? is a special character in a url
    //It designates a query string and everything after it are key-value pairs separated by &
    res.redirect("/login?msg=fail&test=hello");
  }
  //res.json(req.body);
});

app.get("/welcome", (req, res, next) => {
  //req.cookies object will have a property for every named cookie that has been set

  res.render("welcome", {
    username: req.cookies.username,
  });
});

//app.param() takes 2 args:
//1 param to look for in the route
//2 the callback to run with the usuals

// app.param("id", (req, res, next, id) => {
//   console.log("Params called:", id);
//   next();
// });

//Params are used to pass different paths for urls
//Query strings are used to pass on info to the server
app.get("/story/:storyId", (req, res, next) => {
  res.send(`<h1>Story ${req.params.storyId}</h1>`);
});

app.get("/statement", (req, res, next) => {
  //Just shows the file
  // res.sendFile(
  //   path.join(__dirname, "userStatements/BankStatementChequing.png")
  // );

  //App has download options with 2 args:
  //1. Filename
  //2. What you want the filename to download as

  //res.download sets rhe headers to:
  //content-disposition to "attachment" with a filename of the 2nd arg
  res.download(
    path.join(__dirname, "userStatements/BankStatementChequing.png"),
    "Your BankStatement.png"
  );
  //If there is an error in sending the file, headers may already be sent
  //You can check them with

  if (error) {
    //res.headersSent is a bool, true if the headers are alredy sent
    if (!res.headersSent) {
      res.redirect("/download/error");
    }
  }
});

app.get("/logout", (req, res, next) => {
  //res.clearCookietakes 1 arg: the cookie to clear by name
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
