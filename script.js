// VARIABLES
var root = document.querySelector(":root")
var grid = document.getElementById("grid")
var gridSize = 16 /*getComputedStyle(document.querySelector(":root")).getPropertyValue("--gridSize")*/
var newGridSize
var COLORMODE = "defaultColorMode"
var COLOR = "black"

const value = document.querySelector("#value") /* display the chosen pixels size */
const input = document.querySelector("#gridInput")


const clearButton = document.querySelector("#clearButton")
const colorModeButton = document.querySelector("#colorMode")
const erasorModeButton = document.querySelector("#erasorMode")
const colors = document.querySelectorAll(".color")

value.textContent = input.value

// Make sure that you both need to click and hover when painting
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//
createGrid(gridSize)

// FUNCTIONS
function createGrid(gridSize) {
    for (let i=0; i < gridSize; i++) {
        for (let j=0; j < gridSize; j++) {
            var cell = document.createElement("div")
            cell.setAttribute("id","cell_" + i + "_" + j)
            cell.classList.add("cell")
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
    if (e.type === 'mouseover' && !mouseDown) return /* make sure that you have to both click and hover to paint */
    if (COLORMODE === "defaultColorMode") {
        e.target.style.backgroundColor = "black"
    } else if (COLORMODE === "erasorMode") {
        e.target.style.backgroundColor = "white"
    } else if (COLORMODE === "colorMode") {
        e.target.style.backgroundColor = COLOR
    } else if (COLORMODE === "randomMode") {
        var red = Math.floor(Math.random()*256)
        var green = Math.floor(Math.random()*256)
        var blue = Math.floor(Math.random()*256)
        COLOR = `rgb(${red}, ${green}, ${blue})`
        /*console.log(COLOR)*/
        e.target.style.backgroundColor = COLOR
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
            element.setAttribute("style", "background-color: white;")
        }
    }
}


// METHODS
input.addEventListener("input", (event) => {
  value.textContent = event.target.value
  newGridSize = Number(value.textContent)
  deleteGrid(gridSize)
  gridSize = newGridSize
  root.style.setProperty('--gridSize', newGridSize) /* change CSS variable */
  createGrid(gridSize)
})

clearButton.addEventListener("click", () => {
    clearGrid(gridSize)
})

colorModeButton.addEventListener("click", () => {
    COLORMODE = "colorMode"
    COLOR = "#000"
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
        /*console.log(COLOR)*/
    })
})


const randomModeButton = document.querySelector(".randomModeButton")
randomModeButton.addEventListener("click", () => {
    COLORMODE = "randomMode"
    addCellListener()
})