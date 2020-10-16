const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DoorSchema = mongoose.Schema({
  doorID: {
    type: String,
    default: uuidv4().substring(0, 12),
  },
  name: {
    type: String,
    required: true,
  },
  entrance_exit: {
    type: Boolean,
    required: true,
  },
  sensor1comport: {
    type: String,
    required: true,
  },
  sensor2comport: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
  buildingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "building",
  },
});

module.exports = mongoose.model("door", DoorSchema);
