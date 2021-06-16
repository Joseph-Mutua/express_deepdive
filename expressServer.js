
const express = require("express");
const app = express();

app.all("*", (req, res) => {
  res.send("<h1>Express Homepage!</>");

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
