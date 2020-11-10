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
    const buildingInfos = await buildingInfo.find({
      _id: req.params.id,
    });
    const mappedDoorIDentrance = await doorInfo.find({
      $and: [{ buildingID: req.params.id }, { entrance_exit: true }],
    });
    const totalentrance = await eventInfo.find({
      doorID: mappedDoorIDentrance[0]._id,
    });
    const mappedDoorIDexit = await doorInfo.find({
      $and: [{ buildingID: req.params.id }, { entrance_exit: false }],
    });
    const totalexit = await eventInfo.find({ doorID: mappedDoorIDexit[0]._id });

    var serviceRate = 100;
    var rho = totalentrance.length / serviceRate;
    var l = (rho * rho) / (1 - rho);
    var wq = l / totalentrance.length;
    var w = wq + 1 / serviceRate;
    var waittime = Math.round(w * 60, 0);
    res.json({
      buildingInfos,
      entrancetoday: totalentrance.length,
      entsensor1: mappedDoorIDentrance[0].sensor1comport,
      entsensor2: mappedDoorIDentrance[0].sensor2comport,
      exittoday: totalexit.length,
      exitsensor1: mappedDoorIDexit[0].sensor2comport,
      exitsensor2: mappedDoorIDexit[0].sensor2comport,
      waittime: waittime,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = dashboardrouter;
