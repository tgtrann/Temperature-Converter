const leftInput = document.querySelector("#left-input");
const rightInput = document.querySelector("#right-input");
const leftLabel = document.querySelector("#left-label");
const rightLabel = document.querySelector("#right-label");
const arrow = document.querySelector("#convert-to-arrow");

let leftUnit = "Celsius";
let rightUnit = "Fahrenheit";

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
  const sourceUnit = source === leftInput ? leftUnit : rightUnit; //keeps track of where the user inputted the string

  // Strip any character that isn't a digit or dot, and remove minus signs unless they're the first character
  const cleaned = source.value.replace(/(?!^)-|[^0-9.-]/g, "");

  //ensure the inputted value is a valid number
  const isValidNumber =
    cleaned !== "" &&
    cleaned !== "-" &&
    cleaned !== "." &&
    Number.isFinite(Number(cleaned));

  //once the value is a valid number, convert the value
  target.value = isValidNumber
    ? convertValue(Number(cleaned), sourceUnit).toFixed(1)
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
