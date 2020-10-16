const express = require("express");
const buildingrouter = express.Router();
const buildingInfo = require("../model/buildingmodel");

buildingrouter.post("/post", async (req, res) => {
  const info = new buildingInfo({
    buildingID: req.body.buildingID,
    name: req.body.name,
    capacity: req.body.capacity,
    occupancy: req.body.occupancy,
  });

  try {
    const savedInfo = await info.save();
    res.json(savedInfo);
    console.log(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = buildingrouter;
