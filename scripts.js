const COLOR_STATE_PICKER = 'color picker';
const COLOR_STATE_RANDOM = 'random';
const COLOR_STATE_ERASER = 'eraser';
const COLOR_STATE_SHADING = 'shading';
const COLOR_STATE_LIGHTING = 'lighting';

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
            case 'shadeBtn':
                currentButton = COLOR_STATE_SHADING;
                break; 
            case 'lightBtn':
                currentButton = COLOR_STATE_LIGHTING;
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
        divBlock.style.backgroundColor = 'rgb(255, 255, 255, 0.836)';
        //divBlock.addEventListener('mouseover', toColorBlock());
        divBlock.addEventListener('mouseover', () => {
            switch (currentButton) {
                case COLOR_STATE_PICKER:
                    divBlock.style.backgroundColor = colorPicker.value;                                      
                    break;
                case COLOR_STATE_SHADING:
                    //divBlock.style.backgroundColor = darkerColor(colorPicker.value.toString(), .1);
                    divBlock.style.backgroundColor = darkerColor(divBlock.style.backgroundColor, .1);
                    break; 
                case COLOR_STATE_LIGHTING:
                    divBlock.style.backgroundColor = lighterColor(divBlock.style.backgroundColor, .1);
                    break; 
                case COLOR_STATE_RANDOM:
                    divBlock.style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
                    break;
                case COLOR_STATE_ERASER:
                    divBlock.style.backgroundColor = 'white';
                    break;
            }        
        });
        gridContainer.appendChild(divBlock);
    }
}

var pad = function(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

/*
ссылка на источник
https://overcoder.net/q/71157/%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%B1%D0%BE%D0%BB%D0%B5%D0%B5-%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D1%8B%D0%B9-%D1%82%D0%B5%D0%BC%D0%BD%D1%8B%D0%B9-%D1%86%D0%B2%D0%B5%D1%82-%D0%B2-css-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-javascript
*/
// Ratio is between 0 and 1
var changeColor = function(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};
var lighterColor = function(color, ratio) {
    return changeColor(color, ratio, false);
};
var darkerColor = function(color, ratio) {
    return changeColor(color, ratio, true);
};

// Use
//var darker = darkerColor('rgba(80, 75, 52, .5)', .2);
//var lighter = lighterColor('rgba(80, 75, 52, .5)', .2);


//events for first load
reloadGrid();