const express = require("express");
const index = express();
const homeRoute = require("./homepage");
const dashboardRoute = require("./dashboardpage");
const eventRoute = require("./eventpage");
const doorRoute = require("./doorpage");

index.use("/", homeRoute);
index.use("/dashboard", dashboardRoute);
index.use("/event", eventRoute);
index.use("/door", doorRoute);

module.exports = index;
