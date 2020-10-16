const express = require("express");
const eventrouter = express.Router();
const doorInfo = require("../model/doormodel");
const eventInfo = require("../model/eventmodel");
const buildingInfo = require("../model/buildingmodel");

eventrouter.post("/post/:id", async (req, res) => {
  const mappedDoorID = await doorInfo.find({ _id: req.params.id });
  const mappedBuildingID = await buildingInfo.find({
    _id: mappedDoorID[0].buildingID,
  });
  var current = mappedBuildingID[0].occupancy;
  if (mappedDoorID[0].entrance_exit) {
    current = current + 1;
  } else {
    current = current - 1;
  }
  try {
    await mappedBuildingID[0].updateOne({
      $set: { occupancy: current },
    });
  } catch (err) {
    console.log(err);
  }

  const info = new eventInfo({
    doorID: mappedDoorID[0]._id,
    timestamp: req.body.timestamp,
    newoccupancy: current,
  });

  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

eventrouter.get("/", async (req, res) => {
  try {
    const eventInfos = await eventInfo.find();
    res.json(eventInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

eventrouter.get("/:id", async (req, res) => {
  try {
    const eventInfos = await eventInfo.find({
      _id: req.params.id,
    });
    res.json(eventInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = eventrouter;
