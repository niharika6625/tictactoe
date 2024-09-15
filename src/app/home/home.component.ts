import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

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
  audioWin: HTMLAudioElement;

  constructor(public dialog: MatDialog) {
    this.audioX = new Audio('assets/sound/clickSoundX.mp3');
    this.audioO = new Audio('assets/sound/clickSoundO.mp3');
    this.audioWin = new Audio ('assets/sound/winnerSound.mp3');
  }

  handleTileClick(index: any) {
    if (this.gameBoard[index] || this.winner) {
      return;
    }

    const player = this.isXTurn ? 'X' : 'O';
    this.isXTurn = !this.isXTurn; // Toggle the turn for the next player
    this.gameBoard[index] = player;

    this.playClickSound(player);

    this.winner = this.checkWin();
    if (this.winner) {
      this.playWinSound();
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

  playWinSound() {
    this.audioWin.play(); // Play the winning sound
  }

  // showInfo() {
  //   alert(`
  //     Game Rules:
  //     1. The game is played on a 3x3 grid.
  //     2. Players take turns placing their mark (X or O) in an empty square.
  //     3. Game always starts with player X.
  //     4. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins.
  //     5. If all 9 squares are filled and no player has three in a row, the game is declared a draw.
  
  //     Features added:
  //     - A sound plays when a player places X or O.
  //     - A winner sound is played when the game is won.
  //     - Visual highlighting for winning tiles.
  //     - The game keeps track of wins for both players and draws.
  //     - Option to reset the game and clear the score history.
  //   `);
  // }

  showInfo() {
    this.dialog.open(InfoDialogComponent, {
      width: '400px',
      height: 'auto',
    });
  }
}
