
export class Gameboard{


     #board=Array(10).fill().map(()=>Array(10).fill('EMPTY'))
     #ships=[];


     // adding ship 
    addShip=(ship)=>{
    this.#ships.push(ship);
   }

   get getShips(){
     return this.#ships;
   }

    // check  if all ships so far are sunk
    allSunk=()=>{
        if(this.getShips.length===0){
            return false;
        }

         return this.getShips.every(ship => ship.isSunk());
            
    }

     // check for bounds 
    _isOutOfBounds=(x,y,length,orientation)=>{
       return (orientation==='vertical')
       ?(x+length >=this.#board.length):
       (y+length >=this.#board[0].length);
    }

    // check for overlap
    _hasOverLap=(x,y,length,orientation)=>{
       return (orientation==='vertical')?
       (this.#board.slice(x,x+length)).some((row)=>row[y]!=="EMPTY")
       :(this.#board[x].slice(y,y+length)).some((cell)=>cell!=="EMPTY")
    }


    // updating the board state
    _markShipCells=(ship,x,y,orientation)=>{
        for(let i=0;i<ship.getLength;i++){
            if(orientation==='vertical'){
                this.#board[x+i][y]='SHIP';
            }
            else{
                this.#board[x][y+i]='SHIP';
            }
        }

    }
    


    placeShip=(ship,x,y,orientation)=>{


        // validate bounderies
        if(this._isOutOfBounds(x,y,ship.getLength,orientation)){
            throw new Error(`Placement out of bounds at (${x},${y})`);
        }
        
        // check for overlap
        if(this._hasOverLap(x,y,ship.getLength,orientation)){
            throw new Error(`Overlap detected at (${x},${y})`);
        }


        // update the board state
        this._markShipCells(ship,x,y,orientation);


        // Delegate coordinate tracking to ship
        ship.setPlacementCoordinates(x,y,orientation);

         // track  ship reference
        this.addShip(ship);
      
        

           }
    
   


    // receive attack from AI
    receiveAttack=(x,y)=>{

        // validate boundries for attack
        if(x <0 || x >=this.#board.length || y<0 || y >=this.#board[0].length){
            throw new Error("Attack  out of bounds")
        }

        const cell=this.#board[x][y];

        // check  for duplicate attack
        if(cell==='MISS' || cell==='HIT'){
             return "ALREADY ATTACKED";
        }


        if(cell==="SHIP"){
            //find the ship
            const ship=this.getShips.find(ship =>ship.getCoordinates.some((coor)=> coor.x===x && coor.y===y));

            ship.hit();
            this.#board[x][y]='HIT';

            return (ship.isSunk())? "SUNK" :"HIT";

        }

        this.#board[x][y]="MISS";
        return "MISS";

    }   

}