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
            button.style.height = "30px";
            button.style.border = "1px solid black";
            button.style.margin = "5px";
            button.style.borderRadius = "50%";
            
        }
        
    }
}
createButtonGrid();