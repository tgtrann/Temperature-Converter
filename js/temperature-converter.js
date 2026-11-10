/**variables that allow easier access & control */
const leftInput = document.getElementById("left-input");
const rightInput = document.getElementById("right-input");
const leftLabel = document.getElementById("left-label");
const rightLabel = document.getElementById("right-label");
const arrow = document.getElementById("convert-to-arrow");

let leftUnit = "Celsius";
let rightUnit = "Fahrenheit";
let currentCelsius = null;

/**variables for access canvas properties and sprite animations */
const canvas = document.getElementById('HotColdAnimation');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1725;
const CANVAS_HEIGHT = canvas.height = 1024;
const spriteWidth = 345;
const spriteHeight = 512;
let spriteFrame = 0;
let stagger = 0;
const staggerFrame = 21;
let playerState = 'hot';

const boySprite = document.getElementById("HotColdBoy");

//row = which row of the sprite sheet the state draws from
// frames = how many columns to cycle through (1 = frozen on column 0)
const animationStates = {
  hot:         { row: 0, frames: 5 },
  'mild-hot':  { row: 0, frames: 1 },
  cold:        { row: 1, frames: 5 },
  'mild-cold': { row: 1, frames: 1 },
};

function animate(){
  //run the code below once stagger has reached staggerFrame count
  if((stagger % staggerFrame) == 0)
  {
    //if there is still a next frame to show, clear the canvas and draw the current frame then increment to the next sprite
    if(spriteFrame < 5) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const state = animationStates[playerState];
      let frameX = spriteWidth * (spriteFrame % state.frames);
      let frameY = spriteHeight * state.row;
      ctx.drawImage(boySprite, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      spriteFrame++;
    }
    else 
    {
      //reset sprites back to the first sprite so the cycle can start over
      spriteFrame = 0;
    }
    //reset stagger to 0, to reloop the animation
    stagger = 0;
  }
  //iterate stagger
  stagger++;
  
  //animate frames
  requestAnimationFrame(animate);
}
  
animate();

//calculates celsius to fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

//calculates fahrenheit to celsius
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

//@value the temperature value that the user typed in
//@fromUnit a string value that tells the function which unit value the input is currently in
//function converts a value from its current unit into the other unit
function convertValue(value, fromUnit) {
  return fromUnit === "Celsius"
    ? celsiusToFahrenheit(value)
    : fahrenheitToCelsius(value);
}

//figures out which box the user typed in and fills the other box with the converted value
function handleInput(event) {
  const source = event.target; //stores the input the user typed in on where the event triggered
  const target = source === leftInput ? rightInput : leftInput; // keeps track of where the result of the conversion should be displayed
  const sourceUnit = source === leftInput ? leftUnit : rightUnit; //keeps track of the unit of the input box the user has typed into

  // Strip any character that isn't a digit or dot, and remove minus signs unless they're the first character
  const filteredInput = source.value.replace(/(?!^)-|[^0-9.-]/g, "");

  //ensure the inputted value is a valid number
  const isValidNumber =
    filteredInput !== "" &&
    filteredInput !== "-" &&
    filteredInput !== "." &&
    Number.isFinite(Number(filteredInput));

  const celsiusValue = sourceUnit === "Celsius"
  ? Number(filteredInput)
  : fahrenheitToCelsius(Number(filteredInput));

  //store the current temperature at celsius for playerState to use and compare to
  currentCelsius = isValidNumber ? celsiusValue : null;

  //store the player state based on which temperature zone currentCelsius falls into (keeps the previous state when there's no valid input)
  if (currentCelsius != null) {
    if (currentCelsius > 23) {
      playerState = 'hot';
    } else if (currentCelsius >= 17) {
      playerState = 'mild-hot';
    } else if (currentCelsius >= 0) {
      playerState = 'mild-cold';
    } else {
      playerState = 'cold';
    }
  }

  //once the value is a valid number, convert the value
  target.value = isValidNumber
    ? convertValue(Number(filteredInput), sourceUnit).toFixed(1)
    : "";
}

//flips which unit is shown on which side, carrying each box's value along with its unit
function switchSides() {
  [leftUnit, rightUnit] = [rightUnit, leftUnit]; //assigns leftUnit and rightUnit to switch sides
  leftLabel.textContent = leftUnit; //ensures that left label is associated with the leftUnit
  rightLabel.textContent = rightUnit; //ensures the right label is associated with the rightUnit

  [leftInput.value, rightInput.value] = [rightInput.value, leftInput.value];  //assigns the leftInput and rightInput values to swap sides
}

//listens for event in which user inputs a string into one of the boxes, which calls the handleInput function
leftInput.addEventListener("input", handleInput);
rightInput.addEventListener("input", handleInput);
//listens for event where user clicks on the arrows which calls the switchSide function
arrow.addEventListener("click", switchSides);
