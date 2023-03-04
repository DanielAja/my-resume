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

  col = Math.floor(document.body.clientWidth / 100);
  row = Math.floor(document.body.clientHeight / 100);
  items: number[] | undefined;

  createSquares = (qua: any) => {
    this.items = [...Array(qua).keys()]
  };
  constructor( private cdref: ChangeDetectorRef ) {} 
  createGrid = () => {
    this.col = Math.floor(document.body.clientWidth / 100);
    this.row = Math.floor(document.body.clientHeight / 100)+1;
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
    if (this.tiles.nativeElement.children[index].classList.contains('active') === setValue || this.start === false){
      return;
    }
    if (userClick) {
      setTimeout(() => {this.isActive = !this.isActive;
        this.messageEvent.emit("Hola Mundo!");
      }, 500);
    }
    const delay = 50;

    if (setValue) {
    this.tiles.nativeElement.children[index].classList.add('active');
    } else {
      this.tiles.nativeElement.children[index].classList.remove('active');
    }

    const indexDown = index + this.col;
    const indexUp = index - this.col;
    const indexLeft = index -1;
    const indexRight = index +1;
    const count=this.col * this.row
    if (indexDown < count) {
      setTimeout(() => {this.onClick(indexDown, setValue);}, delay); 
    }
    if (indexUp < count && indexUp >= 0) {
      setTimeout(() => {this.onClick(indexUp, setValue);}, delay); 
    }
    if (indexLeft % this.col < this.col - 1 && indexLeft < count && indexLeft >= 0) {
      setTimeout(() => {this.onClick(indexLeft, setValue);}, delay); 
    }
    if (indexRight % this.col > 0 && indexRight < count) {
      setTimeout(() => {this.onClick(indexRight, setValue);}, delay); 
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
