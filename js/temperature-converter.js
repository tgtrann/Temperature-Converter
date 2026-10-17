var celsiusInput = document.getElementById('cDegree');
var fahrenheitInput = document.getElementById('fDegree');

// WHAT TO ACCOUNT FOR
// USER MAY ENTER ANYTHING OTHER THEN NUMBERS INSTEAD - CONVERSION SHOULD NOT HAPPEN

//checks for any user input for celsius then converts the converted temperature for fahrenheit
celsiusInput.addEventListener("input", () => {
    if(celsiusInput.value == "") {
        fahrenheitInput.value = "";
        return;
    }

    //convert celsius to fahrenheit
    fahrenheitInput.value =
        (Number(celsiusInput.value) * 9/5 + 32).toFixed(1);
});

//checks for any user input for fahrenheit then converts the converted temperature into celsius
fahrenheitInput.addEventListener("input", () => {
    if(fahrenheitInput.value == ""){
        celsiusInput.value = "";
        return;
    }

    //convert fahrenheit to celsius
    celsiusInput.value = 
        ((Number(fahrenheitInput.value) - 32) * 5/9).toFixed(1);
});



