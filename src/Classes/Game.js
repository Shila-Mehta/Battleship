import { AIPlayer } from "../players/AIPlayer";
import { HumanPlayer } from "../players/HumanPlayer";

 export class  Game {

        constructor(difficulty='easy'){
            this.human=new HumanPlayer();
            this.ai=new AIPlayer(difficulty);

            // setter usage
            this.human.EnemyBoard=this.ai.getOwnGameBoard;
            this.ai.EnemyBoard=this.human.getOwnGameBoard;


            
            // default player 
            this.currentPlayer='human'; // or ai

        }


        switchTurn(){
            this.currentPlayer= (this.currentPlayer==='human')?'ai':'human';
            return this.currentPlayer;
        
        }


       
        playHumanTurn(x, y) {
            if(this.isGameOver()) {
             console.log("Game already ended");
              return;
            }

            const result = this.human.attack(x, y);

             const turn =this.switchTurn();

            return {result,x,y,turn};
        }

        playAiTurn() {

            if(this.isGameOver()){
              console.log("Game already ended");
              return;
            } 
            const [x, y] = this.ai.generateAttack();
            const result = this.ai.attack(x, y);
             const turn=this.switchTurn();
             
            return {result,x,y,turn};
         }
         

        isGameOver(){
            const humanWins=this.human.getEnemyGameBoard.allSunk();
            const aiWins=this.ai.getEnemyGameBoard.allSunk();

            if(humanWins) console.log('human wins');
            if(aiWins)  console.log('ai wins');

            return humanWins || aiWins;
        }

}