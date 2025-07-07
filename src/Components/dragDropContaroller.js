import { dragState } from "../Data/dragState";

export function setupShipDrag() {
  document.querySelector('.shipyard').addEventListener('dragstart', (e) => {
    const ship = e.target.closest('.ship');
    if (!ship) return;

    const orientation= ship.style.transform.includes('rotate(90deg)')?'vertical':'horizontal';

    const shipData = {
      id: ship.id,
      length: parseInt(ship.dataset.length),
      orientation: orientation
    };

    dragState.set(shipData);
  });

  

  document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'r' && dragState.get()) {
    const current = dragState.get();
    current.orientation = current.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    // console.log('Rotated:', current.orientation);

    const shipEl = document.getElementById(current.id);
    if (shipEl) {
      shipEl.style.transform = current.orientation === 'vertical' ? 'rotate(90deg)' : 'rotate(0deg)';
    }
  }
});
}



export function enableBoardDrop(boardElement, game, renderBoard) {

  boardElement.querySelectorAll('.cell').forEach((cell) => {

    cell.addEventListener('dragover', (e) => {
      e.preventDefault();

      const dragged = dragState.get();
      if (!dragged) return;

      const x = parseInt(cell.dataset.row);
      const y = parseInt(cell.dataset.col);

      const cellsToHighlight = [];

      for (let i = 0; i < dragged.length; i++) {
        const row = dragged.orientation === 'vertical' ? x + i : x;
        const col = dragged.orientation === 'horizontal' ? y + i : y;
        const selector = `[data-row="${row}"][data-col="${col}"]`;
        const targetCell = boardElement.querySelector(selector);
        if (targetCell) {
          cellsToHighlight.push(targetCell);
        }
      }

      boardElement.querySelectorAll('.cell.highlight').forEach(c => c.classList.remove('highlight'));
      cellsToHighlight.forEach(c => c.classList.add('highlight'));
    });

    cell.addEventListener('dragleave', () => {
      boardElement.querySelectorAll('.cell.highlight').forEach(c => c.classList.remove('highlight'));
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();

      const dragged = dragState.get();
      if (!dragged) return;

      const x = parseInt(cell.dataset.row);
      const y = parseInt(cell.dataset.col);

      const ship = game.human.ship(dragged.length);
      const placed = game.human.getOwnGameBoard.placeShip(ship, x, y, dragged.orientation);

      if (!placed) {
        alert("Invalid placement");
        return;
      }


      // Enable play button only when all 5 ships are placed
        if (game.human.getOwnGameBoard.getShips.length === 5) {
          document.querySelector('.play-btn').disabled = false;
        }


      renderBoard(game.human.getOwnGameBoard.getBoard, boardElement);
      enableBoardDrop(boardElement, game, renderBoard); // ← reattach drop listeners


      const shipEl = document.getElementById(dragged.id);
      if (shipEl) shipEl.remove();

      dragState.clear();

      // Clear highlight after dropping
      boardElement.querySelectorAll('.cell.highlight').forEach(c => c.classList.remove('highlight'));
    });
  });
}
