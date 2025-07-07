import { CellStates } from "../Data/cellStates";

export class Gameboard{
     #board=Array(10).fill().map(()=>Array(10).fill(CellStates.EMPTY))
     #ships=[];
    


     get getBoard(){
        return this.#board;
     }


     // adding ship 
    addShip(ship){
    this.#ships.push(ship);
   }

   get getShips(){
     return this.#ships;
   }

    // check  if all ships so far are sunk
    allSunk(){
        if(this.getShips.length===0){
            return false;
        }

         return this.getShips.every(ship => ship.isSunk());
            
    }

     // check for bounds 
    _isOutOfBounds(x,y,length,orientation){
       return (orientation==='vertical')
       ?(x+length >=this.#board.length):
       (y+length >=this.#board[0].length);
    }

    // check for overlap
    _hasOverLap(x, y, length, orientation) {
        if (orientation === 'vertical') {
            const rows = this.#board.slice(x, x + length);
            // console.log("Checking vertical cells:", rows.map(r => r[y]));
            // console.log(CellStates.EMPTY);
            return rows.some(row => row[y] !== CellStates.EMPTY);
        } else {
            const cells = this.#board[x].slice(y, y + length);
            // console.log("Checking horizontal cells:", cells);
            //  console.log(CellStates.EMPTY);
            return cells.some(cell => cell !== CellStates.EMPTY);
        }
}



    // updating the board state
    _markShipCells(ship,x,y,orientation){
        for(let i=0;i<ship.getLength;i++){
            if(orientation==='vertical'){
                this.#board[x+i][y]=CellStates.SHIP;
            }
            else{
                this.#board[x][y+i]=CellStates.SHIP;
            }
        }

    }
    


    placeShip(ship, x, y, orientation) {
        console.log("inside placeShip");

        // Check bounds
        if (this._isOutOfBounds(x, y, ship.getLength, orientation)) {
            console.warn(`Out of bounds at (${x},${y})`);
            return false;
        }

        // Check overlap
        if (this._hasOverLap(x, y, ship.getLength, orientation)) {
            console.warn(`Overlap detected at (${x},${y})`);
            return false;
        }

        // Update board state
        this._markShipCells(ship, x, y, orientation);

        // Store ship's internal coordinates
        ship.setPlacementCoordinates(x, y, orientation);

        // Add to tracked ships
        this.addShip(ship);

        return true;
  }

   


    // receive attack from AI
    receiveAttack(x,y){

        // validate boundries for attack
        if(x <0 || x >=this.#board.length || y<0 || y >=this.#board[0].length){
            throw new Error("Attack  out of bounds")
        }

        const cell=this.#board[x][y];

        // check  for duplicate attack
        // if(cell===CellStates.MISS || cell===CellStates.HIT){
        //      return "ALREADY ATTACKED";
        // }


        if(cell===CellStates.SHIP){
            //find the ship
            const ship=this.getShips.find(ship =>ship.getCoordinates.some((coor)=> coor.x===x && coor.y===y));

            ship.hit();
            this.#board[x][y]=CellStates.HIT;

            return (ship.isSunk())? CellStates.SUNK :CellStates.HIT;
            // return  CellStates.HIT;

        }

        this.#board[x][y]=CellStates.MISS;
        return CellStates.MISS;

    }   

}