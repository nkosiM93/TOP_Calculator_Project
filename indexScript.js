// Grid dimensions for the calculator layout
const NUMBER_OF_COLUMNS = 4;
const NUMBER_OF_ROWS = 4;
const inputArea = document.querySelector(".inputArea");

// Catch all events inside the input area
inputArea.addEventListener("click", (e) => {

})

// Dynamically create the 4x4 button grid with flex layout and styling
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
            button.style.height = "55px";
            button.style.margin = "5px";
            button.style.backgroundColor = "#c0c0c0";
            button.style.display = "flex";
            button.style.alignItems = "center";
            button.style.justifyContent = "center";
            
            // Style operator buttons (rightmost column) with circular shape and black background
            if (btnBlock === NUMBER_OF_COLUMNS - 1) {
                button.style.borderRadius = "50%";
                button.style.backgroundColor = "black";
            }
        } 
    }
}

// Add text labels (+, -, x, /, numbers) to each button
function labelTheButtons(listOfButtons) {
    const labels = [
                    ["7", "8", "9", "+"],
                    ["4", "5", "6", "-"],
                    ["1", "2", "3", "x"],
                    ["CLR", "0", ".", "/"]
                ];
    
    for (let i = 0; i < listOfButtons.length; i++) {
        
        let btnList = listOfButtons[i].querySelectorAll(".inputButton");
        
        for (let j = 0; j < btnList.length; j++) {
            let btnLabel = document.createElement("h2");
            btnLabel.textContent = `${labels[i][j]}`;

            // Style operator labels with white text for visibility on black background
            if (j === btnList.length - 1)
                btnLabel.style.color = "white";

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
    return first / second;
}

function clear() {
    
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