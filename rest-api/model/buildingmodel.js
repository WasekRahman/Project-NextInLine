const mongoose = require("mongoose");

const BuildingSchema = mongoose.Schema({
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
