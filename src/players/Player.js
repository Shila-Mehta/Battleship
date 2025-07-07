import { Gameboard } from "../Classes/Gameboard";
import { Ship } from "../Classes/ship";
export class Player{
    #attackHistory=[];

    #enemyGameboard;
    #ownGameboard;


    constructor(){
        const board=new Gameboard();
        this.#ownGameboard=board;
     
    }

       ship(length)
       {
         return new Ship(length)

       };


       // ownboard & ownship
      get getOwnGameBoard(){
        return this.#ownGameboard;
    }

     

    // enemy board
    set EnemyBoard(board){
        this.#enemyGameboard=board;
     }

    get getEnemyGameBoard(){
        return this.#enemyGameboard;
    }




    get attackHistory(){
        return this.#attackHistory;
    }


    hasAttacked(x,y){
     return this.#attackHistory.some(([aX,aY]) => x===aX  && y===aY)
    }


    attack(x,y){

        //type validation 
        if(!Number.isInteger(x) ||  !Number.isInteger(y)){
            console.log("Attack coordinates must be integers");
            return;
        }

        if(!this.hasAttacked(x,y)){
            // throw new Error("you have already attacked this position");
             this.#attackHistory.push([x,y])
        }
       
       
        // console.log(`attackHistory :${this.#attackHistory}`)
         return this.getEnemyGameBoard.receiveAttack(x,y);
    }
}