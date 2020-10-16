const express = require("express");
const eventrouter = express.Router();
const doorInfo = require("../model/doormodel");
const eventInfo = require("../model/eventmodel");
const buildingInfo = require("../model/buildingmodel");

eventrouter.post("/post/:doorID", async (req, res) => {
  const mappedDoorID = await doorInfo.find({ doorID: req.params.doorID });
  const mappedBuildingID = await buildingInfo.find({
    buildingID: mappedDoorID[0].buildingID.toString("utf8"),
  });
  console.log(mappedBuildingID);
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
    console.log("Updated");
  } catch (err) {
    console.log(err);
  }

  const info = new eventInfo({
    doorID: mappedDoorID[0].doorID,
    timestamp: req.body.timestamp,
    newoccupancy: current,
  });

  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
    console.log(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

eventrouter.get("/", async (req, res) => {
  try {
    const eventInfos = await eventInfo.find();
    console.log(eventInfos);
    res.json(eventInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

eventrouter.get("/:doorID", async (req, res) => {
  try {
    const eventInfos = await eventInfo.find({
      doorID: req.params.doorID,
    });
    console.log(eventInfos);
    res.json(eventInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = eventrouter;
