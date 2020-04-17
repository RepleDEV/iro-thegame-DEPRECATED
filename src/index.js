const body = document.getElementById('body');
const startbtn = document.getElementById('startgame');
const startMenu = document.getElementById('startmenu');
const mainMenu = document.getElementById('mainMenu');
const subMenu = document.getElementById('subMenu');
const diffBtn = document.getElementById('difficulty_btn');

const slider_r = document.getElementById('slider_red');
const slider_g = document.getElementById('slider_green');
const slider_b = document.getElementById('slider_blue');

const inputValue_r = document.getElementById('input_R')
const inputValue_g = document.getElementById('input_G')
const inputValue_b = document.getElementById('input_B')

const helpBtn = document.getElementById('helpBtn');
const helpTextDiv = document.getElementById('helpText');

const outputText = document.getElementById('result-output');

var color_bitrate = 0;

function round(n , r, ceil) {
    var acceptedNumbers = []

    var high = 0;
    var low = 0;

    let i;

    for (i = 0; i < (ceil / r); i++){
        acceptedNumbers.push(i*r);
    }

    for (i = 0;i < acceptedNumbers.length; i++){
        var num = acceptedNumbers[i];

        if (num == n) {
            return n;
        }

        if (num > n - r && !(num > n)) {
            low = num;
        }
        else if (num < n + r && !(num < n)) {
            high = num;
        }
    }

    var diff = high - low;


    if (parseInt(n.toString().charAt(n.toString.length + 1)) < diff / 2) {
        return low;
    } else {
        return high;
    }
}

function easyDiff(){
    startGame();

    color_bitrate = 4

    slider_r.step = 256 / Math.pow(2, color_bitrate)
    // console.log(slider_r.step);
}
function medDiff(){
    startGame();

    color_bitrate = 6;

    slider_r.step = 256 / Math.pow(2, color_bitrate)
    // console.log(slider_r.step);
}
function hardDiff() {
    startGame();

    color_bitrate = 8;

    slider_r.step = 256 / Math.pow(2, color_bitrate)
    // console.log(slider_r.step);
}


function randomColor() {
    const rng_r = Math.floor(Math.random() * 256);
    const rng_g = Math.floor(Math.random() * 256);
    const rng_b = Math.floor(Math.random() * 256);

    return [rng_r, rng_g, rng_b];
}

statusOutputs = ['v','v','v']

function updateStatus() {
    for (var i = 0; i < statusOutput.length; i++){
        if (statusOutput[i] == 0){
            statusOutputs[i] = '<'
            outputText.innerHTML = 'Status:R' + statusOutputs[0] + ';G' + statusOutputs[1] + ';B' + statusOutputs[2];
            return;
        }
        else if (statusOutput[i] == 1){
            statusOutputs[i] = '>'
            outputText.innerHTML = 'Status:R' + statusOutputs[0] + ';G' + statusOutputs[1] + ';B' + statusOutputs[2] ;
            return;
        }
    }
    if (statusOutput == randomizedColor){
        outputText.innerHTML = 'Congratulations! You won! Thank you for <i>beta</i> testing!'
    } 
}
var randomizedColor = [0,0,0];

var bg_color_r = "0";
var bg_color_g = "0";
var bg_color_b = "0";

var statusOutput = [0,0,0];

slider_r.oninput = () => {
    bg_color_r = slider_r.value
    body.style.backgroundColor = 'rgb(' + bg_color_r + ',' + bg_color_g + ',' + bg_color_b + ')';
    inputValue_r.value = parseInt(bg_color_r);
    if (slider_r.value == randomizedColor[0]){
        console.log("correct!")
    }
    if (slider_r.value < randomizedColor[0]){
        statusOutput[0] = 0;
    } else if (slider_r.value > randomizedColor[0]){
        statusOutput[0] = 1;
    }
    updateStatus();
}
slider_g.oninput = () => {
    bg_color_g = slider_g.value
    body.style.backgroundColor = 'rgb(' + bg_color_r + ',' + bg_color_g + ',' + bg_color_b + ')';
    inputValue_g.value = parseInt(bg_color_g);
    if (slider_g.value == randomizedColor[1]){
        console.log("correct!")
    }
    if (slider_g.value < randomizedColor[1]){
        statusOutput[1] = 0
    } else if (slider_g.value > randomizedColor[1]){
        statusOutput[1] = 1;
    }
    updateStatus();
}
slider_b.oninput = () => {
    bg_color_b = slider_b.value
    body.style.backgroundColor = 'rgb(' + bg_color_r.toString() + ',' + bg_color_g.toString() + ',' + bg_color_b.toString() + ')';
    inputValue_b.value = parseInt(bg_color_b);
    if (slider_b.value == randomizedColor[2]){
        console.log("correct!")
    }
    if (slider_b.value < randomizedColor[2]){
        statusOutput[2] = 0
    } else if (slider_b.value > randomizedColor[2]){
        statusOutput[2] = 1;
    }
    updateStatus();
}
inputValue_r.oninput = () => {
    if (inputValue_r.value !== "") {bg_color_r = inputValue_r.value.toString();}
    else {bg_color_r = ""}
    slider_r.value = bg_color_r;
    body.style.backgroundColor = 'rgb(' + bg_color_r.toString() + ',' + bg_color_g.toString() + ',' + bg_color_b.toString() + ')';
    if (slider_b.value == randomizedColor[0]){
    }
    if (inputValue_r < randomizedColor[0]) {statusOutput[0] = 0}
    else if (inputValue_r > randomizedColor[0]) {statusOutput[0] = 1}
    updateStatus();
}
inputValue_g.oninput = () => {
    if (inputValue_g.value !== "") {bg_color_g = inputValue_g.value.toString();}
    else {bg_color_g = ""}
    slider_g.value = bg_color_g;
    body.style.backgroundColor = 'rgb(' + bg_color_r.toString() + ',' + bg_color_g.toString() + ',' + bg_color_b.toString() + ')';
    if (slider_g.value == randomizedColor[1]){
        console.log("correct!")
    }
    if (inputValue_g < randomizedColor[1]) {statusOutput[1] = 0}
    else if (inputValue_g > randomizedColor[1]) {statusOutput[1] = 1}
    updateStatus();
}
inputValue_b.oninput = () => {
    if (inputValue_b.value !== "") {bg_color_b = inputValue_b.value.toString();}
    else {bg_color_b = ""}
    slider_b.value = bg_color_b;
    body.style.backgroundColor = 'rgb(' + bg_color_r.toString() + ',' + bg_color_g.toString() + ',' + bg_color_b.toString() + ')';
    if (slider_b.value == randomizedColor[2]){
        console.log("correct!")
    }
    if (slider_b.value < randomizedColor[2]) {
        outputText.innerHTML = 'Status: R' + '<'
    }
    if (inputValue_b < randomizedColor[2]) {statusOutput[2] = 0}
    else if (inputValue_b > randomizedColor[2]) {statusOutput[2] = 1}
    updateStatus();
}
startbtn.onclick = () => {
    randomizedColor = randomColor();
    document.getElementById('colorPreview').style.backgroundColor = 'rgb(' + randomizedColor[0] + ',' + randomizedColor[1] + ',' + randomizedColor[2] + ')'
}

const hideStartMenu = () => {
    startMenu.style.opacity = 0;
    startMenu.setAttribute('class', 'hidden');

    subMenu.style.display = 'block';
    setTimeout(() => subMenu.style.opacity = 1, 10)
}

const displayStartMenu = () => {
    const title = document.getElementById('title');
    const startInfo = document.getElementById('clickInfo');

    var delay = 1200

    changeDisabilityStatus(true);

    subMenu.style.opacity = 0;

    startMenu.setAttribute('class', 'startMenu');
    helpTextDiv.style.opacity = 0;
    document.getElementById('hrStart').style.width = '24rem';
    document.getElementById('sliders').style.opacity = 0;
    setTimeout(() => {
        startMenu.style.opacity = 1;
    }, delay)
    setTimeout(() => {
        startInfo.style.opacity = 1;
    }, delay + 1800)
}

helpBtn.onclick = () => {
    helpTextDiv.style.display = 'block';
    setTimeout(() => {
        helpTextDiv.style.opacity = 1;
    }, 1)
}

const showDrop = () => {document.getElementById('diffMenu').classList.toggle('show')};

window.onclick = (event) => {
    console.log('e')
    if (!event.target.matches('.dropBtn')){
        var dropDowns = document.getElementsByClassName('diffMenu');
        for (let i = 0; i < dropDowns.length; i++){
            let openDropdown = dropDowns[i];
            if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show')
        }
    }
}

function changeDisabilityStatus(status) {
    slider_r.disabled = status; slider_g.disabled = status; slider_b.disabled = status;
    inputValue_b.disabled = status;inputValue_r.disabled = status;inputValue_g.disabled = status;
}

function startGame() {
    subMenu.style.opacity = 0;
    subMenu.setAttribute('class', 'hidden');
    subMenu.style.display = 'none';

    mainMenu.removeAttribute('class');
    mainMenu.setAttribute('style', 'transition-duration: 1200ms; transition-timing-function: ease-in;')
    mainMenu.style.opacity = 1;
    document.getElementById('hrMain').style.width = '24rem';
    setTimeout(() => {document.getElementById('sliders').style.opacity = 1}, 300)
    setTimeout(() => {
        document.getElementById('hrMain').style.width = '9.2rem';
    }, 400)

    changeDisabilityStatus(false);
}