import { Player } from "../src/Player";
import { HumanPlayer } from "../src/players/HumanPlayer";

describe("Player ",()=>{

    let player, mockBoard;
    
    beforeEach(()=>{
        mockBoard={
            "receiveAttack":jest.fn()
        }

        player=new Player(mockBoard);
    })


    test("rejects non-number  coordinates",()=>{
        expect(()=>player.attack(2.5,-1)).toThrow("Attack coordinates must be integers");
    })
   

     test("attack records coordinates in history",()=>{
        player.attack(2,3);
        expect(player.attackHistory).toEqual([[2,3]])
     })

     test("rejects duplicate attacks",()=>{
        expect(()=>{
            player.attack(2,3);
            player.attack(2,3);

        }).toThrow("you have already attacked this position")
     })

     test("attack() calls enemyGameboard.receiveAttack()",()=>{
        player.attack(2,3);
        expect(mockBoard.receiveAttack).toHaveBeenCalledWith(2,3);
     })

})


