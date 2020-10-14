const express = require("express");
const homerouter = express.Router();

homerouter.get("/", (req, res) => {
  res.send("Homepage");
});

module.exports = homerouter;
