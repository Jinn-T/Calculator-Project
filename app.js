// What do we need?
// 1. A function that takes 3 arguments (2 numbers + 1 operator) and that return the result
// 2. Have a way to click on number keys and create string (look into parseInt() or parseFloat() function if you want to work with number type).
// 3. A way to store the numbers in variables (check if number (length) is <= than a certain number of digit)
// 4. A way to store operator clicked in a variable
// 5. Have result displayed when clicking the `=` symbol. (store the result value in a variable).
// 6. Check if the number contains a `.`. If it does not when clicking on the dot, add a dot. If it does, do nothing.
// 7. Clear button should reset all variables.
//    `let displayedNum = “0”`

// max 33 numbers, need to add a cap
// firstly get all the inputs working

// DOM Selectors
let display = document.getElementById("display");
const allBtnNumber = document.querySelectorAll(".number"); //selects all number btns, outputs an array
const operators = document.querySelectorAll(".operator"); // selects all operator btns, outpus an array
console.log(operators);
const allClear = document.querySelector(".all-clear");
const equals = document.querySelector(".equals");
const del = document.querySelector(".delete");
const percent = document.querySelector(".percent");

// store values
let currentNumber = "";
let storedNum = 0;
let lastOperation = "";
let haveDot = false;
let calculatedNum = 0;
// let additionalNumber = 0;

//converts html value to a number
// const numberValue = parseInt();
// console.log(numberValue);

//functions
updateDisplay = (number) => (display.innerHTML += number);

// clear button
allClear.addEventListener("click", () => {
    display.innerText = "";
    currentNumber = currentNumber.innerText = "";
    storedNum = storedNum.innerText = "";
});

// delete button
del.addEventListener("click", () => {
    //use slice to get rid of last char
    display.innerText = display.innerText.slice(0, -1);
    currentNumber = currentNumber.slice(0, -1);
    storedNum = storedNum.slice(0, -1);
});

//inputting number values into display and storing values

allBtnNumber.forEach((button) => {
    button.addEventListener("click", (e) => {
        // display.innerText = "";
        console.log(e.target); // target selects the event object
        console.log(e.target.innerHTML); // selects the hmtl elements
        let target = e.target;

        if (target.innerText === "." && !haveDot) {
            //selecting "." and if we havent selected "." before then we can add the value
            let value = target.innerHTML;
            display.innerHTML += value; // add value to screen
            currentNumber = currentNumber += value; // add value to total num
            haveDot = true; //haveDot is false and once we add a "." we change the value to true so it cannot add it again
        } else if (target.innerText === "." && haveDot) {
            return;
        } else if (currentNumber.length < 30) {
            let value = target.innerHTML; //value of event target
            display.innerHTML += value; // add value to screen
            currentNumber = currentNumber += value; // add value to total num
            console.log(currentNumber);
        }
    });
});

// inputting operators

operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        haveDot = false;
        if (display && currentNumber) {
            lastOperation = lastOperation += e.target.innerText;
            // console.log(lastOperation);
            storedNum = parseFloat(currentNumber);
            display.innerText = "";
            currentNumber = currentNumber.innerText = "";
            return;
        }
    });
});
console.log(lastOperation);

equals.addEventListener("click", (e) => {
    if (lastOperation.slice(-1) === "x") {
        display.innerText = "";
        calculatedNum = storedNum * parseFloat(currentNumber); //storedNum used from the operator event
        let calculatedNumString = calculatedNum.toString();
        display.innerHTML += calculatedNumString;
        currentNumber = calculatedNumString; // update the current number with calculation so we can do further calculations
    } else if (lastOperation.slice(-1) === "+") {
        display.innerText = "";
        calculatedNum = storedNum + parseFloat(currentNumber);
        let calculatedNumString = calculatedNum.toString();
        display.innerHTML += calculatedNumString;
        currentNumber = calculatedNumString;
    } else if (lastOperation.slice(-1) === "/") {
        display.innerText = "";
        calculatedNum = storedNum / parseFloat(currentNumber);
        let calculatedNumString = calculatedNum.toString();
        display.innerHTML += calculatedNumString;
        currentNumber = calculatedNumString;
    } else if (lastOperation.slice(-1) === "-") {
        display.innerText = "";
        calculatedNum = storedNum - parseFloat(currentNumber);
        let calculatedNumString = calculatedNum.toString();
        display.innerHTML += calculatedNumString;
        currentNumber = calculatedNumString;
    }
});

percent.addEventListener("click", (e) => {
    display.innerText = "";
    calculatedNum = (currentNumber / 100).toString(); //current number to a percent
    currentNumber = calculatedNum; // update the current number with percent calculation so we can do further operations
    display.innerHTML += calculatedNum;
});
