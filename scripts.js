const COLOR_STATE_PICKER = 'color picker';
const COLOR_STATE_RANDOM = 'random';
const COLOR_STATE_ERASER = 'eraser';

let slider = document.getElementById("sizeSlider");
let sizeValue = document.getElementById("sizeValue");
let gridContainer = document.querySelector(".grid");
let currentSize = 16;
let currentButton = COLOR_STATE_PICKER;
let mouseDown = false;

let colorPicker = document.getElementById('colorPicker');
let colorBtn = document.getElementById('colorBtn');
let randomColorBtn = document.getElementById('randomColorBtn');
let eraseBtn = document.getElementById('eraseBtn');
let clearBtn = document.getElementById('clearBtn');
let stateButtons = document.querySelectorAll('.switch');

// Loop through the buttons and add the selected class to the current/clicked button
stateButtons.forEach(button => {
    button.addEventListener('click', () => {        
        switch (button.id) {
            case 'colorBtn':
                currentButton = COLOR_STATE_PICKER;
                break; 
            case 'randomColorBtn':
                currentButton = COLOR_STATE_RANDOM;
                break; 
            case 'eraseBtn':
                currentButton = COLOR_STATE_ERASER;
                break; 
        }
        let current = document.getElementsByClassName('selected');
        current[0].className = current[0].className.replace(" selected", "");
        button.classList.add('selected');
    })
});

clearBtn.addEventListener('click', () => { reloadGrid(); });

document.addEventListener('mousedown', () => { mouseDown = true; });
document.addEventListener('mouseup', () => { mouseDown = false; });

// changing grid with slider
slider.addEventListener('input', () => { 
    sizeValue.textContent = `${slider.value} x ${slider.value}`;
    currentSize = slider.value;
    reloadGrid();
});
//sizeValue.addEventListener('input', reloadGrid());


//make new grid inside container > grid
function reloadGrid() {
    gridContainer.innerHTML = "";    
    gridContainer.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

    for (let i = 0; i < currentSize * currentSize; i++) {
        let divBlock = document.createElement('div');
        divBlock.classList.add(`block-${i}`);
        //divBlock.addEventListener('mouseover', toColorBlock());
        divBlock.addEventListener('mouseover', () => {
            //if (mouseDown) {
                switch (currentButton) {
                    case COLOR_STATE_PICKER:
                        divBlock.style.backgroundColor = colorPicker.value;
                        break;
                    case COLOR_STATE_RANDOM:
                        divBlock.style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
                        break;
                    case COLOR_STATE_ERASER:
                        divBlock.style.backgroundColor = 'white';
                        break;
                }
            //}
        });
        gridContainer.appendChild(divBlock);
    }
}


//events for first load
reloadGrid();