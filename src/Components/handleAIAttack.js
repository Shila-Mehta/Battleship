import { SoundService } from "../Services/SoundService";

export function handleAIAttack(service) {
  const { game, renderHumanBoard, humanBoardEle, playerTurnEle, showGameOverPopUp } = service;

  if (game.currentPlayer !== 'ai') return;

       // Show AI thinking message
    playerTurnEle.textContent = 'AI is thinking...';

     setTimeout(() => {
        game.playAiTurn(); // switches to 'human'

       renderHumanBoard(game.human.getOwnGameBoard.getBoard, humanBoardEle);

       if(game.isGameOver()){
         SoundService.playStopSound();
         playerTurnEle.textContent = `🎉${game.currentPlayer} wins🎉`;

         setTimeout(()=>{
          showGameOverPopUp();
         },800)
        
         return;
       }

      SoundService.playHitSound();

    // Now it's human's turn
    playerTurnEle.textContent = `${game.currentPlayer} turn`;
  }, 500);


  
}
