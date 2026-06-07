const NUMBER_OF_COLUMNS = 4;
const NUMBER_OF_ROWS = 4;
const inputArea = document.querySelector(".inputArea");
// Dynamically create the buttons for the calculator
function createButtonGrid(){
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        const btnRow = document.createElement("div");
        btnRow.classList.add("buttonsRow");
        btnRow.style.display = "flex";
        //btnRow.style.gap = "7px";
        btnRow.style.width = "100%";
        inputArea.append(btnRow);

        for (let btnBlock = 0; btnBlock < NUMBER_OF_COLUMNS; btnBlock++) {
            const button = document.createElement("div");
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
            if (btnBlock === NUMBER_OF_COLUMNS - 1) {
                button.style.borderRadius = "50%";
                button.style.backgroundColor = "black";
            }
        }
        
    }
}

function labelTheButtons(listOfButtons) {
    const labels = [
                    ["7", "8", "9", "+"],
                    ["4", "5", "6", "-"],
                    ["1", "2", "3", "x"],
                    ["", "0", ".", "/"]
                ];
    
    for (let i = 0; i < listOfButtons.length; i++) {
        
        let btnList = listOfButtons[i].querySelectorAll(".inputButton");
        
        for (let j = 0; j < btnList.length; j++) {
            let btnLabel = document.createElement("h2");
            btnLabel.textContent = `${labels[i][j]}`;

            //Different styling for the operator labels
            if (j === btnList.length - 1)
                btnLabel.style.color = "white";

            btnList[j].append(btnLabel);
        }
    }
}

createButtonGrid();
labelTheButtons(document.querySelector(".inputArea").querySelectorAll(".buttonsRow"));