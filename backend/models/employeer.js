const mongoose = require("mongoose");
const employeerSchema = mongoose.Schema({

    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
});

module.exports = employeers = mongoose.model("employeer", employeerSchema);