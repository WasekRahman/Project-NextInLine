const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  timestamp: {
    type: String,
    required: true,
  },
  newoccupancy: {
    type: Number,
  },
  doorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "door",
  },
});

module.exports = mongoose.model("event", EventSchema);
