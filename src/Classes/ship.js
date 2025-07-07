
  export class Ship{
    // private properties
    #hits;
    #length;

    #coordinates=[];
   
     constructor(length){
        if(length<=0){
            throw new Error("Length must be greater than 0");
        }
        this.#length=length;
        this.#hits=0
     }

   
    // methods
     hit=()=> this.#hits+=1  
     isSunk=()=> this.#hits >=this.#length


      // sets the placement coordinates 
     setPlacementCoordinates(x,y,orientation){
          for(let i=0;i<this.#length;i++){
            this.#coordinates.push(
                (orientation==='vertical')?
                 {x:x+i, y:y}:
                 {x:x,   y:y+i}
            )
          }
     }


     //  return the coordinates 
     get getCoordinates(){
        if(this.#coordinates.length===0){
            throw new Error("Coordinates not set")
        }
        return this.#coordinates;
     }

      // getters
       get getHits(){
        return this.#hits;
       }

       get getLength(){
        return this.#length;
       }
}