import { SoundService } from "../Services/SoundService";
import { handleAIAttack } from "./handleAIAttack";

export function handlehumanAttack(service) {
  const { aiBoardEle, game, renderAIBoard, playerTurnEle, showGameOverPopUp } = service;

  aiBoardEle.addEventListener('click', (e) => {
    // Block if not a valid cell
    if (!e.target.classList.contains('cell')) return;

    // Block if it's not the human's turn
    if (game.currentPlayer !== 'human') return;

    const x = e.target.dataset.row;
    const y = e.target.dataset.col;

    SoundService.playHitSound();

   
       game.playHumanTurn(x, y); // switches to 'ai'


    // Render updated AI board
    renderAIBoard(game.ai.getOwnGameBoard.getBoard, aiBoardEle);

    // check  if game over after human move
    if(game.isGameOver()){
      SoundService.playStopSound();
      playerTurnEle.textContent = `🎉${game.currentPlayer} wins🎉`;
        setTimeout(()=>{
          showGameOverPopUp();
         },800)
        
       return;
    }

    // Show AI's turn
    playerTurnEle.textContent = `${game.currentPlayer} turn`;

    // Delay AI attack so we can *see* it's AI's turn
    setTimeout(() => {
      handleAIAttack(service);
    }, 500);
  });
}
