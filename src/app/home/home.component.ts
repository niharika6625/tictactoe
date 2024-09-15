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
  selectedTileIndex: number | null = null;

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
    this.isXTurn = !this.isXTurn;
    this.gameBoard[index] = player;
    this.selectedTileIndex = index;

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
      this.draws += 1;
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

    this.winningTiles = [];
    return '';
  }

  handleReset() {
    this.winner = '';
    this.gameBoard = ['', '', '', '', '', '', '', '', ''];
    this.isXTurn = true;
    this.winningTiles = [];
    this.selectedTileIndex = null;
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
    this.draws = 0;
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
    this.audioWin.play();
  }

  showInfo() {
    if (this.dialog.openDialogs.length === 0) {
    this.dialog.open(InfoDialogComponent, {
      width: '400px',
      height: 'auto',
    });}
  }
}
