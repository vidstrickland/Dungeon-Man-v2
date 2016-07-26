var timer = setInterval(update, 1000);
var clock = 0;

function update(){
    clock++;
}

exports.reset = function(){
    clock = 0;
}

exports.currentClock = function(){
    return clock;
}