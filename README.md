#Battleship
## Day1:Project Setup
-configured webpack for bundling
-Set up Jest +Babel for testing 
-Git initialized with .gitignore

## Day2:Ship module 
-Implemented ship class with  TDD(Test Driven Development)
1) hits()  increments hits  
2) isSunk()  returns true if  hits >= length is met 


## Day3:Gameboard Module
-Implemented the core game Logic with:

### Features
---Ship Placement:
 -Boundary Validation (`_isOutOfBounds`)
 -Overlap Detection   (`_hasOverLap`)
 -Coordinate Delegation to `Ship` class

---Attack System:
-Handles  misses/hits/sunk  ships
-Prevent duplicate attacks
-track board state(`HIT / MISS  markers`)

---Win Detection:
-allSunk method  for game completion 

