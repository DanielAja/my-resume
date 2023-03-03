import { Component, ElementRef, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-background-grid',
  template: `<div #tiles class="tiles">
      <div *ngFor="let item of items">
        <div [ngClass]="{'tile': 1}" (click)="onClick(item, !this.isActive, true)"></div>
      </div>
  </div>`,
  styleUrls: ['./background-grid.component.css'],
})
export class BackgroundGridComponent {
  @ViewChild('tiles', { read: ElementRef }) tiles!: ElementRef;

  col = Math.floor(document.body.clientWidth / 50);
  row = Math.floor(document.body.clientHeight / 50);
  items: number[] | undefined;

  createSquares = (qua: any) => {
    this.items = [...Array(qua).keys()]
  };
  constructor( private cdref: ChangeDetectorRef ) {} 
  createGrid = () => {
    this.col = Math.floor(document.body.clientWidth / 50);
    this.row = Math.floor(document.body.clientHeight / 50)+1;
    this.tiles.nativeElement.style.setProperty('--col', this.col);
    this.tiles.nativeElement.style.setProperty('--row', this.row);
    this.createSquares(this.col * this.row);
  };
  ngAfterViewInit() {
    this.createGrid();
    window.addEventListener('resize', this.createGrid);
    this.cdref.detectChanges();
  }
  isActive = false;
  start = false;
  onClick(index: number, setValue = true, userClick = false) {
    const tile = this.tiles.nativeElement.querySelector(`div:nth-child(${index + 1})`);
    if (tile.classList.contains('active') === setValue || this.start === false){
      return;
    }
  
    if (setValue) {
      tile.classList.toggle('active', true);
    } else {
      if (!tile.classList.contains('active')) {
        return;
      }
      tile.classList.toggle('active', false);
    }
  
    if (userClick) {
      this.isActive = !this.isActive;
      this.messageEvent.emit("Hola Mundo!");
    }
  
    const indices = [
      index + this.col,
      index - this.col,
      index - 1,
      index + 1
    ];
  
    for (const i of indices) {
      const count = this.col * this.row;
      if (i >= 0 && i < count && (i % this.col !== 0 || index % this.col !== this.col - 1)) {
        setTimeout(() => this.onClick(i, setValue), 50);
      }
    }
  }
  
  @Input() message!: string;
  ngOnChanges() {
    if (this.message === undefined) {
      return;
    }
    this.start = true;
    this.onClick(Number(this.message), true, true);
  }
  @Output() messageEvent = new EventEmitter<string>();
  
}
