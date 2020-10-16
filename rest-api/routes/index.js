const express = require("express");
const index = express();
const homeRoute = require("./homepage");
const dashboardRoute = require("./dashboardpage");
const eventRoute = require("./eventpage");
const doorRoute = require("./doorpage");
const buildingRoute = require("./buildingpage");

index.use("/", homeRoute);
index.use("/dashboard", dashboardRoute);
index.use("/event", eventRoute);
index.use("/door", doorRoute);
index.use("/building", buildingRoute);

module.exports = index;
