const express = require("express");
const eventrouter = express.Router();
const doorInfo = require("../model/doormodel");
const eventInfo = require("../model/eventmodel");
const buildingInfo = require("../model/buildingmodel");
const sendtext = require("../model/textmessagemodel");

eventrouter.get("/post/:id", async (req, res) => {
  const mappedDoorID = await doorInfo.find({ _id: req.params.id });
  const mappedBuildingID = await buildingInfo.find({
    _id: mappedDoorID[0].buildingID,
  });
  var current = mappedBuildingID[0].occupancy;
  var capacity = mappedBuildingID[0].capacity;

  if (mappedDoorID[0].entrance_exit) {
    current = current + 1;
  } else {
    current = current - 1;
  }
  if (current > capacity) {
    sendtext("+15195676623");
    res.json("Next In Line: You have reached maximum capacity");
  } else if (current < 0) {
    res.json("Occupancy is 0");
  }
    try {
      await mappedBuildingID[0].updateOne({
        $set: { occupancy: current },
      });
    } catch (err) {
      console.log(err);
    }
    var timestamp = new Date();
    const info = new eventInfo({
      doorID: mappedDoorID[0]._id,
      timestamp: timestamp.toString(),
      newoccupancy: current,
    });

    try {
      const savedInfo = await info.save();
      res.json(savedInfo);
    } catch (err) {
      res.json({ message: err });
    }
});

/* Please have this accept mandatory start date parameter and end date parameter, so data is only returned for a certain date interval. */
/* e.g. start:"2020-12-01 00:00:00" end:"2020-12-08 11:59:59"  <---- only results for this range */
/* This is to support the history report and the estimated wait time calculation. */
/* Please note I've changed the event timestame to be a full date time, not just time of day.*/
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
