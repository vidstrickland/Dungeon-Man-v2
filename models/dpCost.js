var mongoose = require("mongoose");

var dpCostSchema = new mongoose.Schema({
    currentDPCost: String
});

module.exports = mongoose.model("dpCost", dpCostSchema);