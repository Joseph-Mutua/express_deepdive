var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  
  //Modifying HTTP Headers
  const date = new Date(1998, 2, 21);
  res.set("Date", date);

  //Accept no cached data
  //Only good for development
  res.set("Cache-Control", "no-store");
  res.set("Content-Type", "text/plain");

  res.render("index", { title: "Express" });
});

module.exports = router;
