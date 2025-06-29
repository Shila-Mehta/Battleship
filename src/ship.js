
  export class Ship{
    // private properties
    #hits;
    #length;
   
     constructor(length){
        this.#length=length;
        this.#hits=0
     }

   
    // methods
     hit=()=> this.#hits+=1  
     isSunk=()=> this.#hits >=this.#length

      // getters
       get getHits(){
        return this.#hits;
       }

       get getLength(){
        return this.#length;
       }
}