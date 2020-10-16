const express = require("express");
const doorrouter = express.Router();
const doorInfo = require("../model/doormodel");
const buildingInfo = require("../model/buildingmodel");

doorrouter.get("/", async (req, res) => {
  try {
    const doorInfos = await doorInfo.find();
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

doorrouter.post("/post/:id", async (req, res) => {
  const mappedID = await buildingInfo.find({ _id: req.params.id });
  const info = new doorInfo({
    name: req.body.name,
    entrance_exit: req.body.entrance_exit,
    sensor1comport: req.body.sensor1comport,
    sensor2comport: req.body.sensor2comport,
    buildingID: mappedID[0]._id,
  });
  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = doorrouter;
