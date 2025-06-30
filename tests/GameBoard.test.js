import { Gameboard } from "../src/Gameboard";
import { Ship } from "../src/ship";

describe("GameBoard",()=>{
    let board;
    let ship;
    beforeEach(()=>{
        board=new Gameboard();
        ship=new Ship(3);

    });

    test("detects out of bounds placement",()=>{
        expect(()=>board.placeShip(ship,8,8,'vertical')).
        toThrow(`Placement out of bounds at (${8},${8})`);
    })

    test("tracks sunk ships",()=>{
       board.placeShip(ship,0,0,'vertical');
       board.receiveAttack(0,0);
       board.receiveAttack(1,0);
       board.receiveAttack(2,0);

       expect(board.allSunk()).toBe(true);


    })
})


describe("receiveAttack",()=>{
    let board;
    let ship;
    beforeEach(()=>{
        board=new Gameboard();
        ship=new Ship(3);
        board.placeShip(ship,0,0,'vertical');
    })


   test('throws for out-of-bounds attacks', () => {
        expect(() => board.receiveAttack(10, 10)).toThrow("Attack  out of bounds");
    });


    test("Duplicte attacks",()=>{
        board.receiveAttack(0,0);
        const result=board.receiveAttack(0,0);
        expect(result).toBe("ALREADY ATTACKED")
    })

    test("attack on sunk ship",()=>{
        board.receiveAttack(0,0);
        board.receiveAttack(1,0);
       const result= board.receiveAttack(2,0);
        expect(result).toBe("SUNK")
    })

    test("First successful hit",()=>{
         const result=board.receiveAttack(0,0);
         expect(result).toBe("HIT")
        
    })

    test("Attack on empty cell",()=>{
        const result=board.receiveAttack(3,3);
        expect(result).toBe("MISS");
    })
})
