const express = require("express");
const eventrouter = express.Router();
const doorInfo = require("../model/doormodel");
const eventInfo = require("../model/eventmodel");

eventrouter.post("/post/:doorID/api/v/", async (req, res) => {
  const mappedID = await doorInfo.find({ doorID: req.params.doorID });
  const info = new eventInfo({
    doorID: mappedID[0].doorID,
    timestamp: req.body.timestamp,
    newoccupancy: req.body.newoccupancy,
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
