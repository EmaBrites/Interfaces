
let spinner = document.getElementsByClassName("spinner")[0];
let porcentageLoaded = document.getElementsByClassName("porcentage-loaded")[0];

function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function () {
       callback();
       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

let porcentage = 0;
setIntervalX(function () {
    porcentageLoaded.innerHTML = ++porcentage + "%"
    if(porcentage == 100)
        spinner.parentElement.style.display = "none";
}, 50, 100);


