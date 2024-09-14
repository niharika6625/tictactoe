import { Component, OnInit } from '@angular/core';

@Component({
  //decorator: this class will be treated like an component
  selector: 'app-home',
  //standalone: true,
  //imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  gameBoard: string[] = ['', '', '', '', '', '', '', '', ''];
  isXTurn: boolean = true;
  winner: string = '';
  xWins: number = 0; 
  oWins: number = 0; 
  history: string[] = [];
  winningTiles: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  handleTileClick(index: any) {
    if (this.gameBoard[index]) {
      return; // If the tile is already occupied, exit the function
    }
    const player = this.isXTurn ? 'X' : 'O';
    this.isXTurn = !this.isXTurn; // Toggle the turn for the next player

    this.gameBoard[index] = player;

  // Play the respective sound based on the player's mark
  this.playClickSound(player);
    this.winner = this.checkWin();
    if (this.winner) {
        this.updateHistory(this.winner);

        if (this.winner === 'X') {
            this.xWins += 1; 

          } else if (this.winner === 'O') {
            this.oWins += 1;
          }
          this.winner = `${this.winner} wins!`;
      } else if (this.gameBoard.every(item => item)) {
        this.winner = 'Game is a draw!';
        this.updateHistory('Draw');
      }
  }

  checkWin(): string {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        this.gameBoard[a] &&
        this.gameBoard[a] === this.gameBoard[b] &&
        this.gameBoard[a] === this.gameBoard[c]
      ) {
        this.winningTiles = pattern;
        return this.gameBoard[a];
      }
    }
    this.winningTiles =[];
    return '';
  }

  handleReset() {
    this.winner = '';
    this.gameBoard = ['', '', '', '', '', '', '', '', ''];
    this.isXTurn = true;
    this.winningTiles = [];
  }

  updateHistory(result: string) {
    if (result === 'X') {
      this.history.push('Winner: X');
    } else if (result === 'O') {
      this.history.push('Winner: O');
    } else if (result === 'Draw') {
      this.history.push('Draw');
    }
  }

  clearHistory() {
    this.xWins = 0;
    this.oWins = 0;
    this.history = [];
  }

  playClickSound(player: string) {
    const audio = new Audio();

    if (player === 'X') {

      audio.src = 'assets/tic-tac-toe/sounds/click-sound-x.mp3';
    } else {
      audio.src = 'assets/tic-tac-toe/sounds/click-sound-o.mp3';
    }
    audio.load();  
    audio.play(); 
  }
}
