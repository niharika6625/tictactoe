import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  gameBoard: string[] = ['', '', '', '', '', '', '', '', ''];
  isXTurn: boolean = true;
  winner: string = '';
  xWins: number = 0;
  oWins: number = 0;
  draws: number = 0;
  history: string[] = [];
  winningTiles: number[] = [];
  audioO: HTMLAudioElement;
  audioX: HTMLAudioElement;

  constructor() {
    this.audioX = new Audio('assets/sound/clickSoundX.mp3');
    this.audioO = new Audio('assets/sound/clickSoundO.mp3');
  }

  handleTileClick(index: any) {
    if (this.gameBoard[index] || this.winner) {
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
      this.draws += 1; // Track number of draws
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
        this.winningTiles = pattern; // Highlight the winning tiles
        return this.gameBoard[a];
      }
    }

    this.winningTiles = []; // Clear the winning tiles if no win
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
    this.draws = 0; // Reset draws when clearing history
    this.history = [];
  }

  playClickSound(player: string) {
    if(player === 'X'){
      this.audioX.play();
    } else {
      this.audioO.play();
    }
  }
}
