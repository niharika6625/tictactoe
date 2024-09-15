import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() value: string = '';
  @Input() isWinningTile: boolean = false;
  @Input() index: number = 0;
  @Input() selectedTileIndex: number | null = null;
  @Output() tileClick = new EventEmitter<number>();

  onTileClick() {
    this.tileClick.emit(this.index);
  }
}