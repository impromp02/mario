function gridDataset(rows, cols) {
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

export default gridDataset;

/*function defaulter(rows, cols) {
  const dataset = gridDataset(rows, cols);
  let array = [];
  let count = 0;
  for(let i = 1; i <= rows; i++) {
    const arrIn = [];
    for(let j = 1; j <= cols; j++) {
      arrIn.push(`div ${i}${j}--${dataset[count]}`);
      count++;
    }
    array.push(arrIn);
  }
  return array;
} */