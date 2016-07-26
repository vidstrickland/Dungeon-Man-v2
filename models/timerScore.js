var mongoose = require("mongoose");

var timerSchema = new mongoose.Schema({
    time: Number
});

module.exports = mongoose.model("Timer", timerSchema);