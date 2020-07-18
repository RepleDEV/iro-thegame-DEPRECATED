// Full Script for iro-thegame

// Main containers
const body = document.getElementById('body');
const startMenu = document.getElementById('startmenu');
const mainMenu = document.getElementById('mainMenu');
const subMenu = document.getElementById('subMenu');

const colorPreview = document.getElementById('colorPreview'); // Preview of randomized color
const statusColor = document.getElementById("statusColor"); // Color indicator

const inputContainer = document.getElementById('colorInputs'); // Container for inputs
const logoContainer = document.getElementById('imgStart'); // Container for logo

// Main buttons
const submitBtn = document.getElementById('submitBtn'); // Submit button 
const startbtn = document.getElementById('startgame'); // Start game button
const helpBtn = document.getElementById('helpBtn'); // Help button
const creditBtn = document.getElementById('creditBtn'); // Credit button
const diffBtn = document.getElementById('difficulty_btn'); // Button / Dropdown to select difficulty

const startText = document.getElementById('clickInfo'); // "Click anywhere to start" text

const helpTextContainer = document.getElementById('helpText'); // It is what it is
const creditTextContainer = document.getElementById('creditText');

// Main Sliders
const slider_r = document.getElementById('slider_red'); // Red
const slider_g = document.getElementById('slider_green'); // Green
const slider_b = document.getElementById('slider_blue'); // Blue

// Manual Inputs
const inputValue_r = document.getElementById('input_R'); // Red
const inputValue_g = document.getElementById('input_G'); // Green
const inputValue_b = document.getElementById('input_B'); // Blue

// Extra difficulty checkboxes
const extraDifficulties_border = document.getElementById('border_checkbox'); // Border
const extraDifficulties_submitBtn = document.getElementById('submit_checkbox'); // Submit
const extraDifficulties_indicator  = document.getElementById('indicator_checkbox'); // Indicator

// Global Variables
var color_bitrate = 0; // Color bitrate (4/6/8)
var step = 0; // Colour step (256 / Math.pow(2, color_bitrate) - 1)
var score = 0; // Score. 1 = 1 correct primary color. 2 = 2 correct primary colors. 3 = all primary colors are correct

// Options
var enableIndicator = true;
var enablePicker = false;
var enableBorder = false;
var enableSubmit = false;

var clickStatus = false; // If false, user cant continue to start menu

// Color picker. Color picker by iro.js (iro.js.org)
var colorPicker = new iro.ColorPicker('#colorPicker',{
    width:140, // Width
    color:'#f00', // Initial color
    display:'block', // Display 
    margin:'20px', // Margin
    wheelLightness:false, // Hard to explain, just check out the iro.js website (iro.js.org)
    color:'white' // Again-
});

// Rounding function. Rounds numbers
function round(n , r, ceil) { // n = number, r = the number it needs to round? ceil = max n
    var acceptedNumbers = []; // Accepted numbers

    var high = 0; // High value
    var low = 0; // Low value

    let i; // Index for the for loops

    // Updates acceptedNumbers
    for (i = 0; i < (ceil / r); i++)acceptedNumbers.push(i*r);

    // Updates high and low
    for (i = 0;i < acceptedNumbers.length; i++){
        var num = acceptedNumbers[i]; // Variable for the acceptedNumbers array

        if (num == n)return n; // if "num" is the same as "n", return "n"

        // If "num" is higher than "n" - "r" AND num ISNT higher than "n", assign "low" as "num"
        if (num > n - r && !(num > n))low = num;

        // Else if "num" is lower than "n" + "r" AND "num" ISNT lower than "n", assign "high" as "num"
        else if (num < n + r && !(num < n))high = num;
    }

    // difference between the high and low values
    var diff = high - low;

    return parseInt(n.toString().charAt(n.toString().length + 1)) < diff / 2 ? low : high;
}

// Checks if the user has selected extra options
function checkExtraDifficulties(){
    // The extra difficulties
    var extraDifficulties = [extraDifficulties_border,extraDifficulties_indicator,extraDifficulties_submitBtn];

    // Checks them difficulties
    if (extraDifficulties[0].checked)enableBorder = true;
    if (!extraDifficulties[1].checked)enableIndicator = false;
    if (extraDifficulties[2].checked)enableSubmit = true;
}

function updateSteps(n){
    slider_r.step = n;
    slider_g.step = n;
    slider_b.step = n;

    inputValue_r.step = n;
    inputValue_g.step = n;
    inputValue_b.step = n;
}

// Easy difficulty
function easyDiff(){
    startGame();

    color_bitrate = 4
    step = 256 / Math.pow(2, color_bitrate);
    updateSteps(step - 1);

    checkExtraDifficulties();
}
// Medium
function medDiff(){
    startGame();

    color_bitrate = 6;

    step = 256 / Math.pow(2, color_bitrate);

    updateSteps(step - 1);

    checkExtraDifficulties();
}
// Hard
function hardDiff() {
    startGame();

    color_bitrate = 8;

    step = 256 / Math.pow(2, color_bitrate);

    updateStep(step - 1);

    checkExtraDifficulties();
}

// Decides random color
function randomColor() {
    const rng_r = Math.floor(Math.random() * 256);
    const rng_g = Math.floor(Math.random() * 256);
    const rng_b = Math.floor(Math.random() * 256);

    return [rng_r, rng_g, rng_b];
}

// Updates status / indicator
function updateStatus(v1,v2,v3) {
    if (!enableIndicator)return;
    var points = [0,0,0];
    var colors = [parseInt(bg_color_r),parseInt(bg_color_g),parseInt(bg_color_b)];
    var i;
    for (i = 0;i<colors.length;i++) {
        if (colors[i] >= randomizedColor[i])points[i] = 256 / (colors[i]/randomizedColor[i]);
        else if (colors[i] < randomizedColor[i])points[i] = colors[i] * (256/randomizedColor[i]);
    }
    var format = `rgb(${points[0]},${points[1]},${points[2]}`;
    statusColor.style.backgroundColor = `${format})`
    score = 0;
    for (i=0;i<colors.length;i++) if (colors[i] == randomizedColor[i]) score++; else return;
    (score == 3 && !enableSubmit) && endGame();
    return;
}

// Endgame... Ends the game :D
function endGame(){
    changeDisabilityStatus(true);
    statusColor.style.backgroundColor = '';
    statusColor.style.background = '';
    statusColor.style.width = '100%';
    statusColor.innerHTML = `<p><span class='colorfulText'>Congratulations! You won!</span><br>If you have any feature suggestions/bug reports please open an issue in <a href='https://github.com/RepleDEV/iro-thegame' style='color:rgb(${randomizedColor[0]},${randomizedColor[1]},${randomizedColor[2]});'>this GitHub repo</a>.<br>Thank you for playing!`;
    startbtn.disabled = true;
    enablePicker = false;   
}

// Updates the page background
function updateBackground(r,g,b) {
    r = r.toString();
    g = g.toString();
    b = b.toString();
    body.style.backgroundColor = `rgb(${r},${g},${b})`;
}

// Updates the border (if the user selects the "border" extradifficulties)
function updateBorder(){
    if (!enableBorder)return;
    else colorPreview.style.borderColor = `rgb(${bg_color_r.toString()},${bg_color_g.toString()},${bg_color_b.toString()})`;
}

function updateInput(element, value) {element.value = parseInt(value);} // Update input
function updateSlider(slider, value) {slider.value = parseInt(value);} // Update slider
function updatePicker(values){colorPicker.color.rgb = { r: parseInt(values[0]), g: parseInt(values[1]), b: parseInt(values[2])}} // Update color picker

function updateElements() {
    updateBackground(bg_color_r,bg_color_g,bg_color_b);
    updateStatus(bg_color_r,bg_color_g,bg_color_b);
    updatePicker([bg_color_r,bg_color_g,bg_color_b]);
    updateBorder();
}

var randomizedColor = [0,0,0]; // Randomized color global var

// Color values
var bg_color_r = 0; // Red
var bg_color_g = 0; // Green
var bg_color_b = 0; // Blue

// If the submit button was clicked
submitBtn.onclick = () => {
    // And the score is 3
    score == 3 && endGame(); // Endgame... /shrug
}

// Slider functions
slider_r.oninput = () => { // Red slider
    bg_color_r = slider_r.value
    updateInput(inputValue_r,bg_color_r);
    updateElements();
}
slider_g.oninput = () => { // Green slider
    bg_color_g = slider_g.value;
    updateElements();
}
slider_b.oninput = () => { // Blue slider
    bg_color_b = slider_b.value;
    updateElements();
}

// Input functions
inputValue_r.oninput = () => { // Red input
    bg_color_r = inputValue_r.value;
    updateSlider(slider_r,bg_color_r);
    bg_color_r = inputValue_r.value !== "" ? inputValue_r.value.toString() : 0;
    updateElements();
}
inputValue_g.oninput = () => { // Green input
    bg_color_g= inputValue_g.value;
    bg_color_g = inputValue_g.value !== "" ? inputValue_g.value.toString() : 0;
    updateSlider(slider_g,bg_color_g);
    updateElements();
}
inputValue_b.oninput = () => { // Blue
    bg_color_b = inputValue_b.value;
    updateSlider(slider_b,bg_color_b);
    bg_color_b = inputValue_b.value !== "" ? inputValue_b.value.toString() : 0;
    updateElements();
}

// If the start button is clilcked
startbtn.onclick = () => {
    startbtn.innerHTML = "Reset Color"; // Change the text
    randomizedColor = randomColor(); // Update randomizedColor
    for (var i = 0; i < randomizedColor.length; i++) {
        if (step == 1) step++;
        randomizedColor[i] = round(randomizedColor[i], step - 1, 256);
    }
    colorPreview.style.backgroundColor = `rgb(${randomizedColor[0]},${randomizedColor[1]},${randomizedColor[2]})`;
    changeDisabilityStatus(false); // enable sliders and inputs
    enablePicker = true; // Enable color picker
    colorPicker.on('color:change', (color) => { // Input listener for color picker
        if (!enablePicker)return; // If enablePicker if false, return;
        var {r,g,b} = color.rgb;
        bg_color_r = round(r, step - 1, 256);
        bg_color_g = round(g, step - 1, 256);
        bg_color_b = round(b, step - 1, 256);
        updateBackground(bg_color_r,bg_color_g,bg_color_b);
        updateStatus(bg_color_r,bg_color_g,bg_color_b);
        updateInput(inputValue_r,bg_color_r)
        updateInput(inputValue_g,bg_color_g);
        updateInput(inputValue_b,bg_color_b);
        updateSlider(slider_r,bg_color_r);
        updateSlider(slider_g,bg_color_g);
        updateSlider(slider_b,bg_color_b);
        updateBorder();
        color.rgb = { r: bg_color_r, g:bg_color_g, b:bg_color_b};
    });
    // If enableSubmit is false, disable the button
    // else, remove the "disabled" style
    !enableSubmit ? submitBtn.disabled= true : submitBtn.setAttribute('class', '');
}

// Function for hiding start menu
function hideStartMenu() {
    if (!clickStatus)return;
    startMenu.style.opacity = 0;
    startMenu.setAttribute('class', 'hidden');

    subMenu.style.display = 'inline-block';
    setTimeout(() => subMenu.style.opacity = 1, 10);

    extraDifficulties_indicator.checked = true;
}

function displayStartMenu() {
    setTimeout(() => window.scrollTo(0,0), 10); // So, there's this scrolling issue where when the page loads, it immediately scrolls to the bottom, and this was the only solution that i could think about.

    const DELAY = 1200; // Animation delay

    changeDisabilityStatus(true); // Disable sliders and inputs

    // Animation stuff
    mainMenu.style.display = 'none';
    subMenu.style.opacity = 0;
    startMenu.setAttribute('class', 'startMenu');
    helpTextContainer.style.opacity = 0;
    helpTextContainer.style.display = 'none';
    creditTextContainer.style.opacity = 0;
    creditTextContainer.style.display = 'none';
    document.getElementById('hrStart').style.width = '24rem';
    inputContainer.style.display = 'none';
    inputContainer.style.opacity = 0;

    setTimeout(() => {
        logoContainer.style.opacity = 1;
    }, DELAY);

    setTimeout(() => {
        logoContainer.style.opacity = 0;
        clickStatus = true;
        setTimeout(() => logoContainer.style.display = 'none', 400);
        setTimeout(() => startText.style.opacity = 1,800);
        setTimeout(() => startMenu.style.opacity = 1,1400);
    }, DELAY + 1800);
}

var ACTIVE = "miniBtnActive";
var buttonStatus = 0;

// If the help button was clicked
helpBtn.onclick = () => {
    if (buttonStatus == 0){
        buttonStatus = 1;
        helpBtn.classList.toggle(ACTIVE);
        helpTextContainer.style.display = 'block';
        setTimeout(() => helpTextContainer.style.opacity = 1, 1);
    }else if (buttonStatus == 1){
        buttonStatus = 0;
        helpBtn.classList.remove(ACTIVE);
        helpTextContainer.style.opacity = 0;
        setTimeout(() => helpTextContainer.style.display = 'none', 1);
    }else if (buttonStatus == 2){
        buttonStatus = 1;
        helpBtn.classList.toggle(ACTIVE);
        creditBtn.classList.remove(ACTIVE);
        helpTextContainer.style.display = 'block';
        setTimeout(() => helpTextContainer.style.opacity = 1, 1);
        creditTextContainer.style.display = 'none';
        setTimeout(() => creditTextContainer.style.opacity = 0, 1);
    }
}

creditBtn.onclick = () => {
    if (buttonStatus == 0){
        buttonStatus = 2;
        creditBtn.classList.toggle(ACTIVE);
        creditTextContainer.style.display = 'block';
        setTimeout(() => creditTextContainer.style.opacity = 1, 1);
    }else if (buttonStatus == 1){
        if (!creditBtn.classList.contains(ACTIVE))creditBtn.classList.toggle(ACTIVE);
        buttonStatus = 2;
        creditTextContainer.style.display = 'block';
        setTimeout(() => creditTextContainer.style.opacity = 1, 1);
        helpBtn.classList.remove(ACTIVE);
        helpTextContainer.style.opacity = 0;
        setTimeout(() => helpTextContainer.style.display = 'none', 1);
    } else if (buttonStatus == 2){
        buttonStatus = 0;
        creditBtn.classList.remove(ACTIVE);
        creditTextContainer.style.display = 'none';
        setTimeout(() => creditTextContainer.style.opacity = 0, 1);
    }
}

// Dropdown js, html, and css, by w3schools.com. Modified (obviously lol)

// Show difficulty dropdown function
function showDrop() {document.getElementById('diffMenu').classList.toggle('show')};

// Closes the dropdown if the user clicks out of the dropdown
window.onclick = (e) => {
    if (!e.target.matches('.dropBtn')){
        var dropDowns = document.getElementsByClassName('diffMenu');
        for (let i = 0; i < dropDowns.length; i++){
            let openDropdown = dropDowns[i];
            openDropdown.classList.contains('show') && openDropdown.classList.remove('show');
        }
    }
}

// Change slider and input disability status
function changeDisabilityStatus(status) { // If status = false, enable the sliders and inputs. Else if status = true, disable the sliders and inputs
    slider_r.disabled = status;slider_g.disabled = status;slider_b.disabled = status;
    inputValue_b.disabled = status;inputValue_r.disabled = status;inputValue_g.disabled = status;

    if (status) {
        slider_r.setAttribute('class', 'sliders disabledSlider');
        slider_g.setAttribute('class', 'sliders disabledSlider');
        slider_b.setAttribute('class', 'sliders disabledSlider');
        
        inputValue_r.setAttribute('class', 'colorValues disabledInput');
        inputValue_g.setAttribute('class', 'colorValues disabledInput');
        inputValue_b.setAttribute('class', 'colorValues disabledInput');
    } else if (!status) {
        slider_r.setAttribute('class', 'sliders sliderRed');
        slider_g.setAttribute('class', 'sliders sliderGreen');
        slider_b.setAttribute('class', 'sliders sliderBlue');

        inputValue_r.setAttribute('class', 'colorValues');
        inputValue_g.setAttribute('class', 'colorValues');
        inputValue_b.setAttribute('class', 'colorValues');
    }
}

// Start the game. Again, animations. (i should've just used anime.js lol)
function startGame() {
    subMenu.style.opacity = 0;
    subMenu.setAttribute('class', 'hidden');
    subMenu.style.display = 'none';
    inputContainer.style.display = 'block';
    mainMenu.style.display = 'inline-block'
    mainMenu.removeAttribute('class');
    mainMenu.setAttribute('style', 'transition-duration: 1200ms; transition-timing-function: ease-in;')
    document.getElementById('hrMain').style.width = '24rem';
    setTimeout(() => {inputContainer.style.opacity = 1; mainMenu.style.opacity = 1;}, 300)
    setTimeout(() => {
        document.getElementById('hrMain').style.width = '14.2rem';
    }, 400)
}