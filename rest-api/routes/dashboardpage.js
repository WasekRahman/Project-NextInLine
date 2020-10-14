const express = require("express");
const dashboardrouter = express.Router();

dashboardrouter.get("/", (req, res) => {
  res.send("Dashboard");
});

module.exports = dashboardrouter;
