import {Ship} from '../src/ship';

describe("ship",()=>{
    let ship;

    beforeEach(()=>{
        ship=new Ship(3);
    })

     test("hit() increments hit count ",()=>{
         ship.hit();
         expect(ship. getHits).toBe(1);
     })

     test("isSunk()  return true wwhen hits >=length",()=>{
           ship.hit();
           ship.hit();
           ship.hit();
           expect(ship.isSunk()).toBe(true);
     })

     test("throw error for invalid length",()=>{
           expect(()=>new Ship(0)).toThrow("Length must be greater than 0");
     })

     test("setPlacementCoordinates()  stores correct coordiantes/positions",()=>{
         ship.setPlacementCoordinates(0,0,'vertical') ;
        expect(ship.getCoordinates).toEqual([{x:0,y:0},{x:1,y:0},{x:2,y:0}])
     })

   
})