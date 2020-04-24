const body = document.getElementById('body');
const startbtn = document.getElementById('startgame');
const startMenu = document.getElementById('startmenu');
const mainMenu = document.getElementById('mainMenu');
const subMenu = document.getElementById('subMenu');
const diffBtn = document.getElementById('difficulty_btn');
const startInfo = document.getElementById('clickInfo');
const sliderDiv = document.getElementById('sliders');   
const logoDiv = document.getElementById('imgStart');

const slider_r = document.getElementById('slider_red');
const slider_g = document.getElementById('slider_green');
const slider_b = document.getElementById('slider_blue');

const inputValue_r = document.getElementById('input_R')
const inputValue_g = document.getElementById('input_G')
const inputValue_b = document.getElementById('input_B')

const helpBtn = document.getElementById('helpBtn');
const helpTextDiv = document.getElementById('helpText');

const statusColor = document.getElementById("statusColor");

var color_bitrate = 0;
var step = 0;

var colorDistance = 0;

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
    step = 256 / Math.pow(2, color_bitrate);

    slider_r.step = step - 1;
    slider_g.step = step - 1;
    slider_b.step = step - 1;

    inputValue_r.step = step - 1;
    inputValue_g.step = step - 1;
    inputValue_b.step = step - 1;
}
function medDiff(){
    startGame();

    color_bitrate = 6;

    step = 256 / Math.pow(2, color_bitrate);

    slider_r.step = step - 1
    slider_g.step = step - 1
    slider_b.step = step - 1

    inputValue_r.step = step - 1;
    inputValue_g.step = step - 1;
    inputValue_b.step = step - 1;
}
function hardDiff() {
    startGame();

    color_bitrate = 8;

    step = 256 / Math.pow(2, color_bitrate);

    slider_r.step = step - 1
    slider_g.step = step - 1
    slider_b.step = step - 1

    inputValue_r.step = step - 1;
    inputValue_g.step = step - 1;
    inputValue_b.step = step - 1;
}


function randomColor() {
    const rng_r = Math.floor(Math.random() * 256);
    const rng_g = Math.floor(Math.random() * 256);
    const rng_b = Math.floor(Math.random() * 256);

    return [rng_r, rng_g, rng_b];
}


function updateStatus(v1,v2,v3) {
    var points = [0,0,0];
    var colors = [parseInt(bg_color_r),parseInt(bg_color_g),parseInt(bg_color_b)];
    var i;
    for (i = 0;i<colors.length;i++) {
        if (colors[i] < randomizedColor[i])points[i] = (colors[i] * (256/randomizedColor[i])) / 256;
        else if (colors[i] > randomizedColor[i])points[i] = (colors[i] / (256*randomizedColor[i])) * 256;
        if (colors[i] == randomizedColor[i])points[i] = 1;
    }
    var format = `rgb(`;
    for (i = 0;i<points.length;i++){
        if (points[i] < 1){
            format += `${points[i] * 256},`;
        }
        else if (points[i] > 1 && points[i] < 2){
            format += `${(2 - points[i]) * 256},`;
        }
        else if (points[i] > 2){
            format += `0,`;
        }
        else if (points[i] == 1) {
            format += `255,`;
        } else if (points[i] == 0){
            format += `0,`;
        }
    }
    format = format.substring(0,format.length-1);
    statusColor.style.backgroundColor = `${format})`

    var score = points[0] + points[1] + points[2];
    if (score == 3){
        changeDisabilityStatus(true);
        statusColor.style.backgroundColor = '';
        statusColor.style.background = '';
        statusColor.style.width = '100%';
        statusColor.innerHTML = `<p>Congratulations! You won!<br>If you have any feature suggestions/bug reports please open an issue in <a href='https://github.com/RepleDEV/iro-thegame' style='color:rgb(${randomizedColor[0]},${randomizedColor[1]},${randomizedColor[2]});'>this GitHub repo</a>.<br>Thank you for playing!`;
        return;
    } 
    return;
}
function updateBackground(r,g,b) {
    r = r.toString();
    g = g.toString();
    b = b.toString();
    body.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}
function updateInput(element, value) {element.value = parseInt(value);}
function updateSlider(slider, value) {slider.value = parseInt(value);}

var randomizedColor = [0,0,0];

var bg_color_r = 0;
var bg_color_g = 0;
var bg_color_b = 0;

var clickStatus = false;

slider_r.oninput = () => {
    bg_color_r = slider_r.value
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    updateInput(inputValue_r,bg_color_r);
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
}
slider_g.oninput = () => {
    bg_color_g = slider_g.value;
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    updateInput(inputValue_g,bg_color_g);
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
}
slider_b.oninput = () => {
    bg_color_b = slider_b.value;
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    updateInput(inputValue_b,bg_color_b);
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
}
inputValue_r.oninput = () => {
    bg_color_r = inputValue_r.value;
    updateSlider(slider_r,bg_color_r);
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    if (inputValue_r.value !== "") {bg_color_r = inputValue_r.value.toString();}
    else {bg_color_r = 0}
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
}
inputValue_g.oninput = () => {
    bg_color_g= inputValue_g.value;
    updateSlider(slider_g,bg_color_g);
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    if (inputValue_g.value !== "") {bg_color_g = inputValue_g.value.toString();}
    else {bg_color_g = 0}
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
}
inputValue_b.oninput = () => {
    bg_color_b = inputValue_b.value;
    updateSlider(slider_b,bg_color_b);
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    if (inputValue_b.value !== "") {bg_color_b = inputValue_b.value.toString();}
    else {bg_color_b = 0}
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
}
startbtn.onclick = () => {
    randomizedColor = randomColor();
    for (var i = 0; i < randomizedColor.length; i++) {
        if (step == 1) step++;
        randomizedColor[i] = round(randomizedColor[i], step - 1, 256);
    }
    document.getElementById('colorPreview').style.backgroundColor = 'rgb(' + randomizedColor[0] + ',' + randomizedColor[1] + ',' + randomizedColor[2] + ')';
    changeDisabilityStatus(false);
    console.log(randomizedColor);
}

const hideStartMenu = () => {
    if (clickStatus == false)return;
    startMenu.style.opacity = 0;
    startMenu.setAttribute('class', 'hidden');

    subMenu.style.display = 'block';
    setTimeout(() => subMenu.style.opacity = 1, 10)
}

const displayStartMenu = () => {
    setTimeout(() => window.scrollTo(0,0), 10)
    var delay = 1200;

    changeDisabilityStatus(true);

    subMenu.style.opacity = 0;

    startMenu.setAttribute('class', 'startMenu');
    helpTextDiv.style.opacity = 0;
    document.getElementById('hrStart').style.width = '24rem';
    sliderDiv.style.display = 'none';
    sliderDiv.style.opacity = 0;
    setTimeout(() => {
        logoDiv.style.opacity = 1;
    }, delay)
    setTimeout(() => {
        logoDiv.style.opacity = 0;
        clickStatus = true;
        setTimeout(() => logoDiv.style.display = 'none', 400);
        setTimeout(() => startInfo.style.opacity = 1,800);
        setTimeout(() => startMenu.style.opacity = 1,1400);
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
    if (!event.target.matches('.dropBtn')){
        var dropDowns = document.getElementsByClassName('diffMenu');
        for (let i = 0; i < dropDowns.length; i++){
            let openDropdown = dropDowns[i];
            if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show')
        }
    }
}

function changeDisabilityStatus(status) {
    slider_r.disabled = status;slider_g.disabled = status;slider_b.disabled = status;
    inputValue_b.disabled = status;inputValue_r.disabled = status;inputValue_g.disabled = status;
    if (status == true) {
        slider_r.setAttribute('class', 'sliders disabledSlider');
        slider_g.setAttribute('class', 'sliders disabledSlider');
        slider_b.setAttribute('class', 'sliders disabledSlider');
        
        inputValue_r.setAttribute('class', 'colorValues disabledInput');
        inputValue_g.setAttribute('class', 'colorValues disabledInput');
        inputValue_b.setAttribute('class', 'colorValues disabledInput');
    } else if (status == false) {
        slider_r.setAttribute('class', 'sliders sliderRed');
        slider_g.setAttribute('class', 'sliders sliderGreen');
        slider_b.setAttribute('class', 'sliders sliderBlue');

        inputValue_r.setAttribute('class', 'colorValues');
        inputValue_g.setAttribute('class', 'colorValues');
        inputValue_b.setAttribute('class', 'colorValues');
    }
}

function startGame() {
    subMenu.style.opacity = 0;
    subMenu.setAttribute('class', 'hidden');
    subMenu.style.display = 'none';
    sliderDiv.style.display = 'block';
    mainMenu.removeAttribute('class');
    mainMenu.setAttribute('style', 'transition-duration: 1200ms; transition-timing-function: ease-in;')
    mainMenu.style.opacity = 1;
    document.getElementById('hrMain').style.width = '24rem';
    setTimeout(() => {document.getElementById('sliders').style.opacity = 1}, 300)
    setTimeout(() => {
        document.getElementById('hrMain').style.width = '9.2rem';
    }, 400)
}