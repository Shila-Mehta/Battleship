import {Ship} from '../src/ship';

describe("ship",()=>{
    let ship;

    beforeEach(()=>{
        ship=new Ship(3);
        console.log("ship created with length:",ship.getLength);
    })

     test("hit() increases hits ",()=>{
         ship.hit();
         expect(ship. getHits).toBe(1);
     })

     test("isSunk()",()=>{
           ship.hit();
           ship.hit();
           ship.hit();
           expect(ship.isSunk()).toBe(true);
     })

     test("throw error for invalid length",()=>{
           expect(()=>new Ship(0)).toThrow("Length must be greater than 0");
     })

   
})