const express = require("express");
const doorrouter = express.Router();
const doorInfo = require("../model/doormodel");
const buildingInfo = require("../model/buildingmodel");

doorrouter.get("/", async (req, res) => {
  try {
    const doorInfos = await doorInfo.find();
    console.log(doorInfos);
    res.json(doorInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

doorrouter.get("/:name", async (req, res) => {
  try {
    const doorInfos = await doorInfo.find({
      name: req.params.name,
    });
    res.json(doorInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

doorrouter.post("/post/:name", async (req, res) => {
  console.log(req.params.name);
  const mappedID = await buildingInfo.find(
    { name: req.params.name },
    "buildingID"
  );
  const info = new doorInfo({
    doorID: req.body.doorID,
    name: req.body.name,
    entrance_exit: req.body.entrance_exit,
    sensor1comport: req.body.sensor1comport,
    sensor2comport: req.body.sensor2comport,
    buildingID: mappedID[0].buildingID,
  });
  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
    console.log(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = doorrouter;
