const express = require("express");
const dashboardrouter = express.Router();

dashboardrouter.get("/", (req, res) => {
  res.send("Dashboard");
});
dashboardrouter.get("/walmart", (req, res) => {
  res.send("For walmart");
});

module.exports = dashboardrouter;
