var secondsLabel = document.getElementById("seconds");
var minutesLabel = document.getElementById("minutes");
var hoursLabel = document.getElementById("hours");

    clock = time.currentClock();

    var minutes = (~~(clock / 60)) % 60;
    var seconds = clock % 60;
    var hours = ~~ (clock / 3600);
    
    if(seconds < 10){
        secondsLabel.innerHTML = "0" + seconds;
    }else{
        secondsLabel.innerHTML = seconds;
    }
    
    if(minutes < 10){
        minutesLabel.innerHTML = "0" + minutes;
    }else{
        minutesLabel.innerHTML = minutes;
    }
    
    if(hours < 10){
        hoursLabel.innerHTML = "0" + hours;
    }else{
        hoursLabel.innerHTML = hours;
    }