const express = require("express");
const dashboardrouter = express.Router();
const buildingInfo = require("../model/buildingmodel");

dashboardrouter.get("/", (req, res) => {
  res.send("Dashboard");
});
dashboardrouter.post("/walmart", async (req, res) => {
  const info = new buildingInfo({
    buildingID: req.body.buildingID,
    name: req.body.name,
    capacity: req.body.capacity,
    occupancy: req.body.occupancy,
  });

  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = dashboardrouter;
