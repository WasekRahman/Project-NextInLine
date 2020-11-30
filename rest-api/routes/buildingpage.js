const express = require("express");
const buildingrouter = express.Router();
const buildingInfo = require("../model/buildingmodel");

buildingrouter.get("/", async (req, res) => {
  try {
    const buildingInfos = await buildingInfo.find();
    res.json(buildingInfos);
  } catch (err) {
    res.json({ message: err });
  }
});
buildingrouter.post("/post", async (req, res) => {
  const info = new buildingInfo({
    name: req.body.name,
    capacity: req.body.capacity,
    occupancy: req.body.occupancy,
    maxthroughput: req.body.maxthroughput,
  });

  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = buildingrouter;
