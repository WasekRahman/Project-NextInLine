const express = require("express");
const dashboardrouter = express.Router();
const buildingInfo = require("../model/buildingmodel");

dashboardrouter.get("/", async (req, res) => {
  try {
    const buildingInfos = await buildingInfo.find();
    res.json(buildingInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

dashboardrouter.get("/:name", async (req, res) => {
  try {
    const buildingInfos = await buildingInfo.find({
      name: req.params.name,
    });
    res.json(buildingInfos);
  } catch (err) {
    res.json({ message: err });
  }
});
dashboardrouter.post("/post/buildinginfo/api/v/", async (req, res) => {
  const info = new models.buildingInfo({
    buildingID: req.body.buildingID,
    name: req.body.name,
    capacity: req.body.capacity,
    occupancy: req.body.occupancy,
  });

  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
    console.log(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = dashboardrouter;
