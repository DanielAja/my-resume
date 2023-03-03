import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: `<app-background-grid
    [message]="this.message"
    (messageEvent)="toggleEvent($event)">
  </app-background-grid>
  <app-scroll-animation
    [toggle]="this.toggle"
    (messageEvent)="receiveMessage($event)">
  </app-scroll-animation>`,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private titleService:Title) {
    this.titleService.setTitle("#LeverageDataToDriveMoreImpact");
  }
  title = 'my-resume';

  message!:string;
  toggle!: boolean;

  receiveMessage($event: any) {
    this.message = $event
  }
  toggleEvent($event: any) {
    this.toggle = !this.toggle;
  }
}
