const express = require("express");
const app = express();

function validateUser(req, res, next) {
  //Get info from request object

  res.locals.validated = true;
  console.log("VALIDATION RAN!!");

  next();
}

app.use("/admin",  validateUser);

app.get("/", (req, res, next) => {
  res.send("<h1>This is the Main Page</h1>");
  console.log(res.locals.validated);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
