const express = require("express");
let router = express.Router();

//Also has router.use, which works like app.use but only for this specific router

function validateUser(req, res, next) {
  res.locals.validated = true;
  console.log("Validated!");
  next();
}

//ValidateUser is middleware that will be added only to this router
//The main router doesn't know about it

router.use(validateUser);

router.get("/", (req, res, next) => {
  res.json({
    msg: "User Router works",
  });
});

module.exports = router;
