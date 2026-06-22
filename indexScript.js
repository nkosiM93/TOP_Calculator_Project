// Grid dimensions for the calculator layout
const inputArea = document.querySelector(".inputArea");
const displayArea = document.querySelector(".display h2");
const equalsButton = document.querySelector(".equals");

// Catch all events inside the input area
let operator = null;
let firstOperand = null;
let secondOperand = null;
let currentInput = "";
let opCounter = 0;
let equalsFlag = false;

function appendToCurrentInput(text) {
    if (text === ".") {
        if (currentInput.includes('.')) return;
        if (currentInput === "") {
            displayArea.append("0.");
            currentInput = "0.";
            return;
        }
    }

    currentInput += text;
    displayArea.append(text);
}

//Fires when any of the buttons are clicked
inputArea.addEventListener("click", (e) => {
    let text = e.target.querySelector("h2") ? 
                e.target.querySelector("h2").textContent:
                e.target.textContent;

    if (text === "+" || text === "-" || text === "*" || text === "/") {
        
        // Clear this flag to avoid clearing of the screen
        equalsFlag = false;

        if (opCounter === 1) {
            secondOperand = Number(currentInput);
            currentInput = "";
            const result = operate(firstOperand, secondOperand, operator);
            if (result === "Error") {
                displayArea.textContent = "Error";
                currentInput = "";
                equalsFlag = true;
                reset();
            } else {
                firstOperand = Number(result);
                const formatted = formatResult(result);
                displayArea.textContent = `${formatted}${text}`;
                secondOperand = null;
                operator = text;
            }
        }else{
            if (displayArea.textContent === "") {

            } else {
                displayArea.append(text);
                firstOperand = Number(currentInput);
                currentInput = "";
                operator = text;
                opCounter++;
            }
        }
    }else if (text === "CLR") {
        displayArea.textContent = "";
        currentInput = "";
        reset();
    }else{
        if (equalsFlag) {
            displayArea.textContent = "";
            equalsFlag = false;
            currentInput = "";
        }
        // Handle decimal input: prevent multiple decimals and allow leading 0.
        if (text === ".") {
            if (currentInput.includes('.')) return;
            if (currentInput === "") {
                displayArea.append("0.");
                currentInput = "0.";
                return;
            }
        }
        displayArea.append(text);
        currentInput += text;
    }
});

function reset () {
    opCounter = 0;
    firstOperand = null;
    secondOperand = null;
    operator = null;
}

// Format numeric results for display: limit precision and trim trailing zeros
function formatResult(value) {
    if (value === "Error") return "Error";
    if (typeof value !== 'number') return String(value);
    if (!Number.isFinite(value)) return "Error";
    if (Number.isInteger(value)) return value.toString();
    // Limit to 10 decimal places, then remove trailing zeros
    return parseFloat(value.toFixed(10)).toString();
}

equalsButton.addEventListener("click", (e) => {
    // Use explicit null checks so numeric 0 is handled correctly
    if (firstOperand === null && secondOperand === null) {
        displayArea.textContent = "";
        return;
    }

    // If an operator was entered but the user didn't type a second operand,
    // treat "=" as returning the first operand (e.g. `1+` then `=` => `1`).
    if (firstOperand !== null && operator !== null 
        && (currentInput === "" || currentInput == null)) {
        const formatted = formatResult(firstOperand);
        displayArea.textContent = formatted;
        currentInput = `${formatted}`;
        equalsFlag = true;
        reset();
        return;
    }
    if (secondOperand === null && firstOperand !== null) {
        secondOperand = Number(currentInput);
        displayArea.textContent = "";
        const result = operate(firstOperand, secondOperand, operator);
        if (result === "Error") {
            displayArea.textContent = "Error";
            currentInput = "";
            equalsFlag = true;
            reset();
            return;
        }
        const formatted = formatResult(result);
        currentInput = `${formatted}`;
        displayArea.append(currentInput);
        equalsFlag = true;
        reset();
        return;
    }

    if (firstOperand !== null && secondOperand !== null) {
        displayArea.textContent = "";
        const result = operate(firstOperand, secondOperand, operator);
        if (result === "Error") {
            displayArea.textContent = "Error";
            currentInput = "";
            equalsFlag = true;
            reset();
            return;
        }
        const formatted = formatResult(result);
        currentInput = `${formatted}`;
        displayArea.append(currentInput);
        equalsFlag = true;
        reset();
        return;
    }
});
// Dynamically create the 4x4 button grid with flex layout and styling
const NUMBER_OF_COLUMNS = 4;
const NUMBER_OF_ROWS = 4;
function createButtonGrid(){
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        const btnRow = document.createElement("div");
        btnRow.classList.add("buttonsRow");
        btnRow.style.display = "flex";
        //btnRow.style.gap = "7px";
        btnRow.style.width = "100%";
        inputArea.append(btnRow);

        for (let btnBlock = 0; btnBlock < NUMBER_OF_COLUMNS; btnBlock++) {
            const button = document.createElement("button");
            btnRow.append(button);
            button.classList.add("inputButton");
    
            const cleanedParentWidth = window.getComputedStyle(btnRow)
                                        .width.split("%");

            button.style.width = `${parseInt(cleanedParentWidth[0], 10) / 4}%`;
            
            // Style operator buttons (rightmost column) with circular shape and black background
            if (btnBlock === NUMBER_OF_COLUMNS - 1) {
                button.style.borderRadius = "50%";
            }
        } 
    }
}

// Add text labels (+, -, x, /, numbers) to each button
function labelTheButtons(listOfButtons) {
    const labels = [
                    ["7", "8", "9", "+"],
                    ["4", "5", "6", "-"],
                    ["1", "2", "3", "*"],
                    ["CLR", "0", ".", "/"]
                ];
    
    for (let i = 0; i < listOfButtons.length; i++) {
        
        let btnList = listOfButtons[i].querySelectorAll(".inputButton");
        
        for (let j = 0; j < btnList.length; j++) {
            let btnLabel = document.createElement("h2");
            btnLabel.textContent = `${labels[i][j]}`;
            btnLabel.style.color = "rgb(11, 0, 61)";
            btnLabel.style.fontFamily = "Nunito";
            btnLabel.style.fontWeight = "400";

            // Style operator labels with white text for visibility on black background
            if (j === btnList.length - 1){
                btnLabel.style.color = "rgb(217, 255, 0)";
                btnList[j].style.backgroundColor = "rgb(11, 0, 61)";

            }
                
            btnList[j].append(btnLabel);
        }
    }
}

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    if (second === 0) return "Error";
    return first / second;
}

function operate(first, second, operator) {

    // Choose operation
    switch(operator) {
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "*":
            return multiply(first, second);
        case "/":
            return divide(first, second);
    }
}

// Initialize the calculator by building the grid and adding labels
createButtonGrid();
labelTheButtons(document.querySelector(".inputArea").querySelectorAll(".buttonsRow"));