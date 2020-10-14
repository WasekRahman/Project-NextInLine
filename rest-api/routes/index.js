const express = require("express");
const index = express();
const homeRoute = require("./homepage");
const dashboardRoute = require("./dashboardpage");

index.use("/", homeRoute);
index.use("/dashboard", dashboardRoute);

module.exports = index;
