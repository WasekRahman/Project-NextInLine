const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BuildingSchema = mongoose.Schema({
  buildingID: {
    type: String,
    default: uuidv4().substring(0, 12),
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
  doors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "door",
    },
  ],
});

module.exports = mongoose.model("building", BuildingSchema);
