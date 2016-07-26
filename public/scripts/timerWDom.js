var walkTime = document.getElementById("currentWalk");

//var User = require("../models/user");
//var time = require("time.currentTime");
var timer = setInterval(update, 1000);
var clock = 0;
//clock = User.get("time");

function update(){
    clock++;
    walkTime.innerHTML = clock;
}