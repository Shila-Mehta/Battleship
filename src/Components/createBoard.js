import { CellStates } from "../Data/cellStates";

export const createBoard = (Gameboard, Element, { hideShips = false } = {}) => {
  Element.innerHTML = '';

  Gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');

      const state = Gameboard[rowIndex][colIndex];

      if (state === CellStates.SHIP) {
        if (hideShips) {
          // cellElement.textContent = '';
          cellElement.classList.add('hidden-ship');
        } else {
          // cellElement.textContent = state;
          cellElement.classList.add('ship');
        }
       } 
      //  else {
      //   cellElement.textContent = state;
      // }

      // Hit/Miss classes
      if (state === CellStates.HIT) cellElement.classList.add('hit');
      if (state === CellStates.MISS) cellElement.classList.add('miss');

      // Position tracking
      cellElement.dataset.row = rowIndex;
      cellElement.dataset.col = colIndex;

      Element.append(cellElement);
    });
  });
};
