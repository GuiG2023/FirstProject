var totaltime = 4;// start from 4 ,actually from "READY"
var timerElement = document.getElementById("timer");

var timer = setInterval(function () {

    timerElement.innerText = totaltime;
    totaltime--;

    if (totaltime == -1) {//when i use == 0 , always seem lesser 1 second
        clearInterval(timer);
        timerElement.innerText = "GO!";
    }

}, 1000);