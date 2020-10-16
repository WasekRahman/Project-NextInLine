const mongoose = require("mongoose");

const DoorSchema = mongoose.Schema({
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
