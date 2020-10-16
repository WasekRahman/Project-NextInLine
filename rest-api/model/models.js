const buildingInfo = require("../model/buildingmodel");
const doorInfo = require("../model/doormodel");
const eventInfo = require("../model/eventmodel");

module.exports = [buildingInfo(), doorInfo(), eventInfo()];
