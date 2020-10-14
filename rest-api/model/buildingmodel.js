const mongoose = require("mongoose");

const BuildingSchema = mongoose.Schema({
  buildingID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupancy: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("building", BuildingSchema);
