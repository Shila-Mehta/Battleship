import { AIPlayer } from "../src/players/AIPlayer";

describe("AIPlayer - Random Attacks", () => {
  let ai;
  const mockBoard = {
    receiveAttack: jest.fn(),
  };

  beforeEach(() => {
    ai = new AIPlayer(mockBoard); // Default to 'easy' mode
    mockBoard.receiveAttack.mockClear(); // Reset between tests
  });


  test("should  generate   100 unique attacks",()=>{
    const attacks=new Set();

    for(let i=0;i<100;i++){
        const {x,y}=ai.generateRandomAttack();
        attacks.add(`${x} ,${y}`);

    }
    expect(attacks.size).toBe(100);
  })


 
  test("enters  target mode after  a hit",()=>{
    mockBoard.receiveAttack.mockReturnValueOnce('HIT');
    ai.attack(3,3);  // first attack hit

    //verify ai switches to target mode
    expect(ai.isInTargetMode()).toBe(true);

  })


 test('records hits and queues adjacent cells', () => {
  ai.recordHit(2, 2); // Simulate a hit
  
  expect(ai.lastHit).toEqual([2, 2]);
  expect(ai.getPotentialTargets()).toEqual(
    expect.arrayContaining([[2, 3], [3, 2]]) // Right and Down
  );
});


  test("prioritizes target mode attacks", () => {
  // Simulate first hit
  mockBoard.receiveAttack.mockReturnValueOnce('HIT');
  ai.attack(5, 5);
  ai.recordHit(5,5);
  
  // Next attack should target adjacent cells
  const result = ai.generateAttack();
  const possibleTargets = [[5,6], [6,5], [5,4], [4,5]];
  expect(possibleTargets).toContainEqual(result);
});
    

  test("exits target mode when ship sinked",()=>{
    mockBoard.receiveAttack.mockReturnValue("SUNK");
    ai.recordHit(1,1);
    ai.attack(1,2); // attack to sink the ship
    expect(ai.isInTargetMode()).toBe(false);
    expect(ai.getPotentialTargets()).toEqual([]);// potential targets should be cleard 
  })


   test("throws if no enemy board",()=>{
       let Ai = new AIPlayer(null);
        expect(()=> Ai.attack(1,1)).toThrow("No enemy board");
    })
  

 
});