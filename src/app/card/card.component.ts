import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
  <div class="container">
  <div class="card"
  [ngClass]="{'flipable': this.tags[0] === 'Angular'}">
    <div class="card-front">
      <div class="emoji">{{ e }}</div>
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <div class="tags">
        <div class="tag" *ngFor="let element of tags; let i = index">
          {{ element }}
        </div>
      </div>
    </div>
    <div class="emoji">{{ back }}
    <div class="card-back center">  </div>
   
   
  </div>
</div>`,
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data!: any;
  ngOnChanges() {
    if (this.data === undefined) {
      return;
    }
    this.e = this.data.emoji;
    this.title = this.data.title;
    this.subtitle = this.data.subtitle;
    this.tags = this.data.tags;
    this.back = this.data.back;
  }
  e = '👋';
  title = 'Hello';
  subtitle = '"Card subtitle"';
  tags = ['Tag 1', 'Tag 2', 'Tag 3'];
  back = '?';
  @Input() flipable!: boolean;

}
