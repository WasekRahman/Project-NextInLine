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

module.exports = dashboardrouter;
