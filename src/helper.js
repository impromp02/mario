/**
 * Function to generate an array of random 0 & 1
 */
export const gridDataSetFunc = function(rows, cols) {
  let array = [];
  let count = 0;
  for(let i = 1; array.length < rows*cols; i++) {
    let digit = Math.round(Math.random());
    if(digit === 1) count++;
    if(count > rows && digit === 1) continue;
    array.push(digit);
  }
  return array;
}

/**
 * Event handler for "KEYUP"
 */
export const traverseGrid = (key, gridArray, grid, props) => {
  const pos = grid.dataset.position.split('-');
  const {rows, cols} = props;
  switch(key) {
    case 'ArrowUp': moveUp(pos, gridArray)
      break;
    case 'ArrowDown': moveDown(pos, gridArray, rows)
      break;
    case 'ArrowLeft': moveLeft(pos, gridArray)
      break;
    case 'ArrowRight': moveRight(pos, gridArray, cols)
      break;
    default: alert('Use arrow keys to feed Mario');
  }
};

/** 
 * Logic for traversing through the grids
 */

const moveDown = (pos, gridArray, rows) => {
  if(+pos[0] === rows) moveUp(pos, gridArray);
  const gridId = `${(parseInt(pos[0]) + 1)}-${pos[1]}`; 
  for(let i = 0; i < gridArray.length; i++) {
    if(gridArray[i].dataset.position === gridId) {
      gridArray[i].focus();
    }
  }
};

const moveUp = (pos, gridArray) => {
  if(+pos[0] === 1) moveDown(pos, gridArray);
  const gridId = `${(parseInt(pos[0]) - 1)}-${pos[1]}`; 
  for(let i = 0; i < gridArray.length; i++) {
    if(gridArray[i].dataset.position === gridId) {
      gridArray[i].focus();
    }
  }
};

const moveLeft = (pos, gridArray) => {
  if(+pos[1] === 1) moveRight(pos, gridArray);
  const gridId = `${pos[0]}-${(parseInt(pos[1]) - 1)}`;
  for(let i=0; i<gridArray.length; i++) {
    if(gridArray[i].dataset.position === gridId) {
      gridArray[i].focus();
    }
  }
};

const moveRight = (pos, gridArray, cols) => {
  if(+pos[1] === cols) moveLeft(pos, gridArray);
  const gridId = `${pos[0]}-${(parseInt(pos[1]) + 1)}`;
  for(let i=0; i<gridArray.length; i++) {
    if(gridArray[i].dataset.position === gridId) {
      gridArray[i].focus();
    }
  }
};