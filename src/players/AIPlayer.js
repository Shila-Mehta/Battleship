import { CellStates } from "../Data/cellStates";
import { Player } from "./Player";

  export class AIPlayer extends Player{
    constructor(difficulty='easy'){
        super();
        this.difficulty=difficulty;
        this.lastHit=null;  // store  the last  successful hit coordinate
        this.potentialTargets=[];// stores adjacent cells to attack 
    }


    isInTargetMode(){
         return this.lastHit!==null;
    }


    getPotentialTargets(){
        return [...this.potentialTargets]; //return a copy to prevent external modification
    }


    recordHit(x,y){

        this.lastHit=[x,y];

        const directions=[
            [0,1] ,// right
            [0,-1] ,//Left
            [1,0] ,// down
            [-1,0] , // up    
        ]

        directions.forEach(([dx,dy])=>{
            const nx=x+dx;
            const ny=y+dy;

            if(nx>=0 && nx<10 && ny>=0 && ny<10  && !this.attackHistory.some(([ax,ay])=> ax===nx && ay===ny)){
                   console.log(  this.potentialTargets);
                   this.potentialTargets.push([nx,ny]);
            }

        })



    }

    generateRandomAttack(){

        let x,y;

        // keep generating until finding  an unattacked spot  
        do{
         x=Math.floor(Math.random()*10);
         y=Math.floor(Math.random()*10);
        }
        while(this.attackHistory.some(([ax,ay])=> ax===x && ay===y));

        return [x,y];
       
    }


    generateAttack(){
        // Target mode:attack adjacent cells first
        if(this.potentialTargets.length > 0){
            return this.potentialTargets.pop();  // pop the last target to attack
        }
         

        // Hunt mode : Fall  back to random Attack
        return this.generateRandomAttack();
    }



    attack(x,y){
       if(!this.getEnemyGameBoard) {
        console.log("No enemy board")
        return;
       }
       const  result = super.attack(x,y);

       if(result ===CellStates.HIT){
         this.recordHit(x,y);
       }
       else if(result ===CellStates.SUNK){
            this.lastHit=null;  // reset last hit after sinking a ship
            this.potentialTargets=[]; // clear potential  targets after sinking a ship
       }

       return result; // return the attack result (HIT,MISS ,SUNK)

    }

}