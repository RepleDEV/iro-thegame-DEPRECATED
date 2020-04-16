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

function easyDiff(){
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
}
function medDiff(){
    return;
}
function hardDiff() {
    return;
}