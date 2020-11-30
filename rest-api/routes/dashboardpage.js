const express = require("express");
const dashboardrouter = express.Router();
const doorInfo = require("../model/doormodel");
const eventInfo = require("../model/eventmodel");
const buildingInfo = require("../model/buildingmodel");

dashboardrouter.get("/", async (req, res) => {
  try {
    const buildingInfos = await buildingInfo.find();
    res.json(buildingInfos);
  } catch (err) {
    res.json({ message: err });
  }
});

dashboardrouter.get("/:id", async (req, res) => {
  try {
    var totalentrance = [];
    var totalexit = [];
    const buildingInfos = await buildingInfo.find({
      _id: req.params.id,
    });
    const mappedDoorIDentrance = await doorInfo.find({
      $and: [{ buildingID: req.params.id }, { entrance_exit: true }],
    });
    if (mappedDoorIDentrance.length > 0) {
      totalentrance = await eventInfo.find({
        doorID: mappedDoorIDentrance[0]._id,
      });
    }

    const mappedDoorIDexit = await doorInfo.find({
      $and: [{ buildingID: req.params.id }, { entrance_exit: false }],
    });
    if (mappedDoorIDexit.length > 0) {
      totalexit = await eventInfo.find({
        doorID: mappedDoorIDexit[0]._id,
      });
    }
    var doors = [];
    for (var i = 0; i < mappedDoorIDentrance.length; i++) {
      doors.push(mappedDoorIDentrance[i]);
    }
    for (var i = 0; i < mappedDoorIDexit.length; i++) {
      doors.push(mappedDoorIDexit[i]);
    }

    var serviceRate = buildingInfos[0].maxthroughput;
    var rho = totalentrance.length / serviceRate;
    var l = (rho * rho) / (1 - rho);
    var wq = l / totalentrance.length;
    var w = wq + 1 / serviceRate;
    var waittime = Math.round(w * 60, 0);
    res.json({
      buildingInfos,
      entrancetoday: totalentrance.length,
      exittoday: totalexit.length,
      waittime: waittime,
      doors,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = dashboardrouter;
