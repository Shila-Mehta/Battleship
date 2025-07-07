import { HumanPlayer } from "../src/players/HumanPlayer"

describe("HumanPalyer",()=>{
   let human;
    beforeEach(()=>{
         human=new HumanPlayer();
    })
     
    test("throws if no enemy board",()=>{
        expect(()=> human.attack(0,0)).toThrow("No enemy board");
    })

})