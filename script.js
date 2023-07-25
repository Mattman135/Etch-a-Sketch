// VARIABLES
var root = document.querySelector(":root")
var grid = document.getElementById("grid")
var gridSize = 16
var newGridSize
var COLORMODE = "defaultColorMode"
var COLOR = "rgb(0,0,0)"
var red
var green
var blue

const value = document.querySelector("#value")
const input = document.querySelector("#gridInput")


const clearButton = document.querySelector("#clearButton")
const colorModeButton = document.querySelector("#colorMode")
const erasorModeButton = document.querySelector("#erasorMode")
const colors = document.querySelectorAll(".color")
const randomModeButton = document.querySelector(".randomModeButton")

value.textContent = input.value

//
createGrid(gridSize)

// FUNCTIONS
function createGrid(gridSize) {
    for (let i=0; i < gridSize; i++) {
        for (let j=0; j < gridSize; j++) {
            var cell = document.createElement("div")
            cell.setAttribute("id","cell_" + i + "_" + j)
            cell.classList.add("cell")
            cell.setAttribute("style", "background-color: rgb(255, 255, 255);")
            grid.appendChild(cell)
        }
    }
    addCellListener()
}

function addCellListener() {
    var cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", setColor)
        cell.addEventListener("mousedown", setColor)
    })
}

function setColor(e) {
    if (COLORMODE === "defaultColorMode") {
        red = 0
        green = 0
        blue = 0  
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if (COLORMODE === "erasorMode") {
        red = 255
        green = 255
        blue = 255
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if (COLORMODE === "colorMode") {
        rgb = convertHexToRgbA(COLOR)
        red = rgb[0]
        green = rgb[1]
        blue = rgb[2]
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if (COLORMODE === "randomMode") {
        red = Math.floor(Math.random()*256)
        green = Math.floor(Math.random()*256)
        blue = Math.floor(Math.random()*256)
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if (COLORMODE === "darkeningMode") {
        if (e.target.style.backgroundColor === "") return
        var hexa = convert(e.target.style.backgroundColor)
        var rgb = convertHexToRgbA(hexa)
        red = rgb[0]*0.9
        green = rgb[1]*0.9
        blue = rgb[2]*0.9
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    }
}

function deleteGrid(gridSize) {
    for (let i=0; i < gridSize; i++) {
        for (let j=0; j < gridSize; j++) {
            var element = document.getElementById(`cell_${i}_${j}`)
            element.remove()
        }
    }
}

function clearGrid(gridSize) {
    for (let i=0; i < gridSize; i++) {
        for (let j=0; j < gridSize; j++) {
            var element = document.getElementById(`cell_${i}_${j}`)
            element.setAttribute("style", "background-color: rgb(255, 255, 255);")
        }
    }
}


// METHODS
input.addEventListener("input", (event) => {
  value.textContent = event.target.value
  newGridSize = Number(value.textContent)
  deleteGrid(gridSize)
  gridSize = newGridSize
  root.style.setProperty('--gridSize', newGridSize)
  createGrid(gridSize)
})

clearButton.addEventListener("click", () => {
    clearGrid(gridSize)
})

colorModeButton.addEventListener("click", () => {
    COLORMODE = "defaultColorMode"
    addCellListener()
})

erasorModeButton.addEventListener("click", () => {
    COLORMODE = "erasorMode"
    addCellListener()
})

colors.forEach((color) => {
    color.addEventListener("click", () => {
        COLOR = color.id
        COLORMODE = "colorMode"
    })
})

randomModeButton.addEventListener("click", () => {
    COLORMODE = "randomMode"
    addCellListener()
})


//
const darkeningEffectButton = document.querySelector(".darkeningEffectButton")
darkeningEffectButton.addEventListener("click", () => {
    COLORMODE = "darkeningMode"
    addCellListener()
})

// Code is borrowed from: https://www.geeksforgeeks.org/how-to-get-hex-color-value-of-rgb-value/
// and: https://www.geeksforgeeks.org/how-to-convert-hex-to-rgba-value-using-javascript/

function convertHexToRgbA(hexVal) {
    var ret;
      
    // If the hex value is valid.
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexVal)) {
          
        // Getting the content after '#',
        // eg. 'ffffff' in case of '#ffffff'
        ret = hexVal.slice(1);
          
        // Splitting each character
        ret = ret.split('');
          
        // Checking if the length is 3
        // then make that 6
        if(ret.length == 3) {
            var ar = [];
            ar.push(ret[0]);
            ar.push(ret[0]);
            ar.push(ret[1]);
            ar.push(ret[1]);
            ar.push(ret[2]);
            ar.push(ret[2]);
            ret = ar;
        }
          
        // Starts with '0x'(in hexadecimal)
        ret = '0x'+ ret.join('');
          
        // Converting the first 2 characters
        // from hexadecimal to r value
        var r = (ret>>16)&255;
          
        // Converting the second 2 characters
        // to hexadecimal to g value
        var g = (ret>>8)&255;
          
        // Converting the last 2 characters
        // to hexadecimal to b value
        var b = ret&255;

        /*console.log(r,g,b)*/
          
        // Appending all of them to make
        // the RGBA value
        return [r, g, b]/*'rgba('+[r, g, b].join(',')+',1)';*/
    }
}


function convert(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
  
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  
    function hexCode(i) {
        return ("0" + parseInt(i).toString(16)).slice(-2);
    }
    return "#" + hexCode(rgb[1]) + hexCode(rgb[2])
            + hexCode(rgb[3]);
}