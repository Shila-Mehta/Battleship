import { Game } from "../src/Game";
describe("Game",()=>{
    let game;

    beforeEach(()=>{

    game=new Game()

    })

    test("Game switches turns",()=>{
        game.PlayTurn(0,0);
        expect(game.currentPlayer).toBe('ai');

    })

    test("Game detects ai wins",()=>{

        // sink all human ships
        humanBoard.ships.forEach((ship)=> ship.hits = ship.length);
        expect(game.isGameOver()).toBe(true);
    })
})