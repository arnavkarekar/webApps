// Initialize the grid and number boxes
const gridContainer = document.getElementById('grid-container');
const topNumbers = document.getElementById('top-numbers');
const sideNumbers = document.getElementById('side-numbers');
let grid = [];

// Initialize an empty 5x5 array
let array = new Array(5).fill(null).map(() => new Array(5).fill(null));

// Populate the array with random 0s and 1s
for (let i = 0; i < 5; i++) {
    let hasOneInRow = false;
    for (let j = 0; j < 5; j++) {
      array[i][j] = Math.floor(Math.random() * 2);
      if (array[i][j] === 1) {
        hasOneInRow = true;
      }
    }
    // Ensure at least one "1" in the row
    if (!hasOneInRow) {
      array[i][Math.floor(Math.random() * 5)] = 1;
    }
  }
  
  // Ensure at least one "1" in each column
  for (let j = 0; j < 5; j++) {
    let hasOneInColumn = array.some(row => row[j] === 1);
    if (!hasOneInColumn) {
      array[Math.floor(Math.random() * 5)][j] = 1;
    }
  }

function calColumn(yCol) {
    let temp = 0;
    let str = "";
    for (let i = 0; i < 5; i++) {
        if (array[i][yCol] == 0) {
            if (temp == 0){
                null
            }
            else {
                str += `${temp} `
                temp = 0
            }
        }
        else {
            temp += 1
        }
    }
    if (temp != 0) {
        str += `${temp} `;
    }
    return str
}

function calRow(xRow) {
    let temp = 0;
    let str = "";
    for (let i = 0; i < 5; i++) {
        if (array[xRow][i] == 0) {
            if (temp == 0){
                null
            }
            else {
                str += `${temp} `;
                temp = 0
            }
        }
        else {
            temp += 1
        }
    }
    if (temp != 0) {
        str += `${temp} `;
    }
    return str;
}

console.log(array);
console.log(calColumn(0))
console.log(calRow(0))

// Create grid
for (let i = 0; i < 5; i++) {
  let row = [];
  for (let j = 0; j < 5; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', function() {
      toggleCell(i, j);
    });
    // Add right-click event listener
    cell.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      toggleX(i, j);
    });
    gridContainer.appendChild(cell);
    row.push(cell);
  }
  grid.push(row);
}

// Create top number boxes
for (let i = 0; i < 5; i++) {
  const numberBox = document.createElement('div');
  numberBox.className = 'number-box vertical-text';  // Keep the 'vertical-text' class here
  const numbers = calColumn(i).split(' ');
  numbers.forEach(num => {
      const span = document.createElement('span');
      span.className = 'upright-text';
      span.textContent = num;
      numberBox.appendChild(span);
  });
  topNumbers.appendChild(numberBox);
}
  
// Create side number boxes
for (let i = 0; i < 5; i++) {
  const numberBox = document.createElement('div');
  numberBox.className = 'number-box right-align-text';  // Add the 'right-align-text' class here
  numberBox.textContent = calRow(i);
  sideNumbers.appendChild(numberBox);
}

let cellStates = new Array(5).fill(null).map(() => new Array(5).fill(0));

function toggleCell(x, y) {
  const cell = grid[x][y];
  if (cellStates[x][y] === 1) {
    cellStates[x][y] = 0;
    cell.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
  } else {
    cellStates[x][y] = 1;
    cell.style.backgroundColor = '#8732f5';
    cell.textContent = '';  // Remove X
  }
}

// Function to handle right-click
function toggleX(x, y) {
  const cell = grid[x][y];
  if (cell.textContent === 'X') {
    cell.textContent = '';  // Remove X
    cellStates[x][y] = 0;  // Reset to original state
  } else {
    cell.textContent = 'X';  // Add X
    cell.textColor = 'white';
    cell.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    cellStates[x][y] = 0;  // Update cellStates to indicate X-ed out
  }
}


// Function to get the state of colored boxes
function getBlackBoxes() {
  return cellStates;
}

function checkWin() {
  state = getBlackBoxes();
  for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++){
      if (state[i][j] === -1) continue;  // Skip X-ed out boxes
      if (state[i][j] !== array[i][j]){
        return false;
      }
    }
  }
  return true;
}


function solveNonogram() {
  if(checkWin()){
    alert("You Win!")
    location.reload();
  }
  else {
    alert("There are still errors")
  }
}

function refreshNonogram() {
  location.reload();
}

function restartNonogram() {
  // Step 1: Reset cellStates to initial state (all 0s)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      cellStates[i][j] = 0;
    }
  }

  // Step 2: Reset the visual grid
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = grid[i][j];
      cell.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      cell.textContent = '';  // Remove any X
    }
  }
}

function updatePositions() {
  const gridContainer = document.getElementById('grid-container');
  const topNumbers = document.getElementById('top-numbers');
  const sideNumbers = document.getElementById('side-numbers');

  const rect = gridContainer.getBoundingClientRect();

  // topNumbers.style.left = rect.left -  + 'px';
  topNumbers.style.width = (rect.width - 570) +'px';

  // sideNumbers.style.top = rect.top + 'px';
  sideNumbers.style.height = rect.height + 'px';
}

window.addEventListener('resize', updatePositions);
window.addEventListener('load', updatePositions);
