import { Game } from "../Classes/Game";
import { SoundService } from "./SoundService";
import { createBoard } from "../Components/createBoard";
import { handlehumanAttack } from "../Components/handleHumanAttack";
import { setupShipDrag } from "../Components/dragDropContaroller";
import { enableBoardDrop } from "../Components/dragDropContaroller";

 export  const  GameService={
  game:new Game(),

  // start
   startGame(){
    
      // initial rendering board
     this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard,this.aiBoardEle);
     this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard,this.humanBoardEle);

  
      this.btnDefault.addEventListener('click',()=>{
      this.startWithDefault();
      this.btnManual.disabled=true;

    })

    this.btnManual.addEventListener('click',()=>{
      this.startWithManual();
      this.btnDefault.disabled=true;

    })


    this.playSound();

    this.startNewGame();

      
   },

   humanDefaultShips(){
      this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(5),1,1,'horizontal');
      this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(4),3,0,'horizontal');
      this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(3),4,5,'vertical');
      this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(5),0,8,'vertical');
      this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(5),9,2,'horizontal');
   },

   AIDefaultShips(){
      this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(4),0,0,"horizontal");
      this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(5),2,3,"horizontal");
      this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(3),4,4,"vertical");
      this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(5),9,4,"horizontal");
      this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(4),4,0,"vertical");

   },


   startWithDefault(){
     this.AIDefaultShips();
     this.humanDefaultShips();
     this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard,this.aiBoardEle);
     this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard,this.humanBoardEle);

     // enable play button immediately
     this.playBtn.disabled=false;
   },

   startWithManual(){
      this.AIDefaultShips();
      setupShipDrag();
      this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard,this.aiBoardEle);
      this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard,this.humanBoardEle);
       enableBoardDrop(this.humanBoardEle, this.game, this.renderHumanBoard);
      //disable play tn until all ships placed
       this.playBtn.disabled=true;

   },

    // DOM elemnts 
    humanBoardEle:document.querySelector('.humanBoard'),
    aiBoardEle:document.querySelector('.aiBoard'),
    playBtn:document.querySelector('.play-btn'),
    playerTurnEle:document.querySelector('.player-turn'),
    btnDefault:document.querySelector('.btn-default'),
    btnManual :document.querySelector('.btn-manual'),



    boardsAttack(){
     handlehumanAttack(this);
    },
    
     renderHumanBoard(humanBoard,humanBoardEle,options={ hideShips: false }){
       createBoard(humanBoard,humanBoardEle,options); 
     },

     renderAIBoard(aiBoard,aiboardElement){
     createBoard(aiBoard,aiboardElement,{ hideShips: true });
     },

     showGameOverPopUp(){
     const popup=document.querySelector('#gameoverPopup');
     popup.classList.remove('hidden');
     },

     hideGameOverPopUp(){
      const popup=document.querySelector('#gameoverPopup');
      popup.classList.add('hidden');

     },

     startNewGame(){
      document.querySelector('.restart-btn').addEventListener('click',()=>{
        this.hideGameOverPopUp();
        this.game=new Game();
        this.playerTurnEle.textContent='human turn';
        this.startGame();
      })

     },

   

    playSound(){
      this.playBtn.addEventListener('click',()=>{

        if(this.game.human.getOwnGameBoard.getShips.length<5){
          alert("You must place all ships before starting the game");
           this.playBtn.disabled=true;
          return;
        }
       SoundService.playStartSound();

       this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard, this.humanBoardEle, { hideShips: false })
       this.boardsAttack();

       // prevent re-playing
       this.playBtn.disabled=true;
      })
    },

    hitSound(){
    this.humanAttack(); 
    },

  
  }




 

 