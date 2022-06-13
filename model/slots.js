//import all require dependencies
var mongoose = require("mongoose");
//schema for superAdmin
var slotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
    },
    contactFirstName: {
      type: String,
      required: true,
    },
    contactLastName: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("slot", slotSchema);
