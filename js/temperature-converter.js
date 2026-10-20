var celsiusInput = document.getElementById('cDegree');
var fahrenheitInput = document.getElementById('fDegree');

//parse input to a number by removing any spaces, digits and letters
function getTemp(input) {
  return input.value.replace(/[^\d\s]/g, '');
}

//checks for user input
fahrenheitInput.addEventListener("input", () => {
  const temp = getTemp(fahrenheitInput);

  //skips conversion if there is no valid input
  if (temp === "") return;

  const fahrenheit = Number(temp);
  //convert value to celsius
  celsiusInput.value = ((fahrenheit - 32) * 5 / 9).toFixed(1);
});

function getTemp(input) {
  return input.value.replace(/\D/g, "");
}

//checks for user input
celsiusInput.addEventListener("input", () => {
  const temp = getTemp(celsiusInput);

  //skips conversion if there are no valid input
  if (temp === "") return;

  const celsius = Number(temp);
  //convert value to fahrenheit
  fahrenheitInput.value = ((celsius * 9 / 5) + 32).toFixed(1);
});


