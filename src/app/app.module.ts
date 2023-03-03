import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TypingAnimationComponent } from './typing-animation/typing-animation.component';
import { ScrollAnimationComponent } from './scroll-animation/scroll-animation.component';
import { BackgroundGridComponent } from './background-grid/background-grid.component';
import { CardComponent } from './card/card.component';
import { ActionButtonComponent } from './action-button/action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TypingAnimationComponent,
    ScrollAnimationComponent,
    BackgroundGridComponent,
    CardComponent,
    ActionButtonComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
