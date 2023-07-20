// VARIABLES
var root = document.querySelector(":root")
var grid = document.getElementById("grid")
var gridSize = getComputedStyle(document.querySelector(":root")).getPropertyValue("--gridSize")
var newGridSize
var Mode = "colorMode" /* color mode is default mode */

const value = document.querySelector("#value") /* pixels, gridSize */
const input = document.querySelector("#gridInput")
const clearButton = document.querySelector("#clearButton")
const colorMode = document.querySelector("#colorMode")
const erasorMode = document.querySelector("#erasorMode")



value.textContent = input.value

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
    addListener()
}

function addListener() {
    var cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", setColor)
        cell.addEventListener("mousedown", setColor)
    })
}

function setColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return /* make sure that you have to both click and hover to paint */
    if (Mode === "colorMode") {
        e.target.style.backgroundColor = "black"
    } else if (Mode === "erasorMode") {
        e.target.style.backgroundColor = "white"
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

clearButton.addEventListener("click", (event) => {
    clearGrid(gridSize)
})

colorMode.addEventListener("click", () => {
    Mode = "colorMode"
    addListener()
})

erasorMode.addEventListener("click", () => {
    Mode = "erasorMode"
    addListener()
})