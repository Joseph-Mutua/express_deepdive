const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the homepage!</h1>")
});

app.post("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.put("/", (req, res) => {});

app.listen(3000, () => {
  console.log("Server running on port 3000!");
});
