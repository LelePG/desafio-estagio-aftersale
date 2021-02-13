"use scrict";

let totalWindows = document.querySelectorAll(".window"); //Array with all the windows

let turnOn = function () {
  //function to turn all the windows on
  totalWindows.forEach((window) => window.classList.add("window-on"));
};

let turnOff = function () {
  //function to turn all the windows off
  totalWindows.forEach((window) => window.classList.remove("window-on"));
};

//Inicialization code to turn all the windows on or off

if (navigator.geolocation) {
  //getting geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    const url = `https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}`;

    //request to the API
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();

    //Json parsing
    const info = JSON.parse(request.responseText);

    //creation of auxiliar variables
    const sunrise = info.results.sunrise;
    const sunset = info.results.sunset;
    const riseTime = sunrise.slice(0, sunrise.indexOf(" ")).split(":");
    const setTime = sunset.slice(0, sunset.indexOf(" ")).split(":");

    //creation of three data objects. One for sunrise, one for sunset and one for the current time.
    let dateTimeRise = new Date();
    dateTimeRise.setUTCHours(Number(riseTime[0]));
    dateTimeRise.setUTCMinutes(Number(riseTime[1]));
    dateTimeRise.setUTCSeconds(Number(riseTime[2]));

    let dateTimeSet = new Date();
    dateTimeSet.setUTCHours(Number(setTime[0]) + 12);
    dateTimeSet.setUTCMinutes(Number(setTime[1]));
    dateTimeSet.setUTCSeconds(Number(setTime[2]));

    let dateTimeNow = new Date();
    //dateTimeNow.setHours(22);//Change this value to test

    //If it is not day time
    if (
      !(
        dateTimeNow.getTime() > dateTimeRise.getTime() &&
        dateTimeNow.getTime() < dateTimeSet.getTime()
      )
    ) {
      turnOn();
    }
    window.alert("Página carregada com sucesso :D");
  });
}

//Turn a window on if it's off and vice-versa
totalWindows.forEach((window) => {
  window.addEventListener("click", function () {
    window.classList.toggle("window-on");
  });
});

//Event listeners on the global control buttons
document.getElementById("on").addEventListener("click", turnOn);

document.getElementById("off").addEventListener("click", turnOff);
