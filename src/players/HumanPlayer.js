import { Player } from "./Player";

export  class HumanPlayer extends Player{

    constructor(){
        super();
    }



    // method to get input  from the user
    getInput=(x,y)=>{
        // if(!this.validateInput(x,y)){
        //     throw new Error(`invalid input from user`);
        // }
        return {x:parseInt(x),y:parseInt(y)};
    }


    

    // method to attack the enemy game board
    attack=(x,y)=>{
      if(!this.getEnemyGameBoard) {
        console.log("No enemy board")
        return;
       }
     const input =this.getInput(x,y);
     return  super.attack(input.x,input.y);

    }



}
