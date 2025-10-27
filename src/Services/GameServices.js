import { Game } from "../Classes/Game";
import { SoundService } from "./SoundService";
import { createBoard } from "../Components/createBoard";
import { handlehumanAttack } from "../Components/handleHumanAttack";
import { setupShipDrag, enableBoardDrop } from "../Components/dragDropContaroller";

export const GameService = {
  game: new Game(),

  // DOM elements
  humanBoardEle: document.querySelector('.humanBoard'),
  aiBoardEle: document.querySelector('.aiBoard'),
  playBtn: document.querySelector('.play-btn'),
  playerTurnEle: document.querySelector('.player-turn'),
  btnDefault: document.querySelector('.btn-default'),
  btnManual: document.querySelector('.btn-manual'),

  // --- Initialize game (call only once)
  initializeGame() {
    this.startGame();
    this.setupListeners();
  },

  // --- Setup listeners (only once)
  setupListeners() {
    this.btnDefault.addEventListener('click', () => {
      this.startWithDefault();
      this.btnManual.disabled = true;
    });

    this.btnManual.addEventListener('click', () => {
      this.startWithManual();
      this.btnDefault.disabled = true;
    });

    this.playBtn.addEventListener('click', () => {
      this.handlePlayClick();
    });

    document.querySelector('.restart-btn').addEventListener('click', () => {
      this.restartGame();
    });
  },

  // --- Start game (initial rendering)
  startGame() {
    this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard, this.aiBoardEle);
    this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard, this.humanBoardEle);
  },

  // --- Handle Play button click
  handlePlayClick() {
    if (this.game.human.getOwnGameBoard.getShips.length < 5) {
      alert("You must place all ships before starting the game");
      this.playBtn.disabled = true;
      return;
    }

    SoundService.playStartSound(); // Play sound
    this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard, this.humanBoardEle, { hideShips: false });
    this.boardsAttack();

    this.playBtn.disabled = true; // prevent multiple clicks
  },

  // --- Restart game
  restartGame() {
    this.hideGameOverPopUp();
    this.game = new Game();   // new game instance
    this.resetUI();
  },

  // --- Reset UI for new game
  resetUI() {
    this.btnDefault.disabled = false;
    this.btnManual.disabled = false;
    this.playBtn.disabled = false;
    this.playerTurnEle.textContent = "human turn";

    // Reset boards
    this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard, this.humanBoardEle);
    this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard, this.aiBoardEle);
  },

  // --- Default ships placement
  humanDefaultShips() {
    this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(5), 1, 1, 'horizontal');
    this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(4), 3, 0, 'horizontal');
    this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(3), 4, 5, 'vertical');
    this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(5), 0, 8, 'vertical');
    this.game.human.getOwnGameBoard.placeShip(this.game.human.ship(5), 9, 2, 'horizontal');
  },

  AIDefaultShips() {
    this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(4), 0, 0, "horizontal");
    this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(5), 2, 3, "horizontal");
    this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(3), 4, 4, "vertical");
    this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(5), 9, 4, "horizontal");
    this.game.ai.getOwnGameBoard.placeShip(this.game.ai.ship(4), 4, 0, "vertical");
  },

  // --- Start with default ships
  startWithDefault() {
    this.AIDefaultShips();
    this.humanDefaultShips();
    this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard, this.aiBoardEle);
    this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard, this.humanBoardEle);

    this.playBtn.disabled = false; // enable play immediately
  },

  // --- Start with manual ship placement
  startWithManual() {
    this.AIDefaultShips();
    setupShipDrag();
    this.renderAIBoard(this.game.ai.getOwnGameBoard.getBoard, this.aiBoardEle);
    this.renderHumanBoard(this.game.human.getOwnGameBoard.getBoard, this.humanBoardEle);
    enableBoardDrop(this.humanBoardEle, this.game, this.renderHumanBoard);

    this.playBtn.disabled = true; // wait until human finishes placing ships
  },

  // --- Render boards
  renderHumanBoard(humanBoard, humanBoardEle, options = { hideShips: false }) {
    createBoard(humanBoard, humanBoardEle, options);
  },

  renderAIBoard(aiBoard, aiBoardEle) {
    createBoard(aiBoard, aiBoardEle, { hideShips: true });
  },

  // --- Human attack logic
  boardsAttack() {
    handlehumanAttack(this);
  },

  // --- Game over popup
  showGameOverPopUp() {
    document.querySelector('#gameoverPopup').classList.remove('hidden');
  },

  hideGameOverPopUp() {
    document.querySelector('#gameoverPopup').classList.add('hidden');
  },

  // --- Hit sound
  hitSound() {
    this.humanAttack();
  },
};