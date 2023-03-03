import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-typing-animation',
  template: `
    <div
      [ngClass]="mainDivClass"
      *ngFor="let element of typingTextArr; let i = index"
    >
      <h1 [ngClass]="classArr[i]">{{ element }}</h1>
    </div>
  `,
  styleUrls: ['./typing-animation.component.css'],
})

export class TypingAnimationComponent {
  mainDivClass = '';

  textToTypeArr = [
    "Hey, I'm Daniel.",
    "I'm a software developer @",
    'IBM',
    'Based in Austin, TX.',
  ];
  typingTextArr = Array(this.textToTypeArr.length).fill('');
  classArr = Array(this.textToTypeArr.length).fill('');
  lineIndex = 0;
  typingText = '';

  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }
  

  updateLine(num: number) {
    switch (num) {
      case 0:
        setTimeout(() => {
          this.typingTextArr[num] = this.typingTextArr[num].replace(
            /Hey/gi,
            '👋'
          );
        }, 750);
        break;
      case 1:
        setTimeout(() => {
          this.typingTextArr[num] = this.typingTextArr[num].replace(
            /developer/gi,
            '👨‍💻'
          );
        }, 1000);
        break;
      case 2:
        setTimeout(() => {
          this.mainDivClass += 'ibm-font';
          this.classArr[num] = 'title';
          //this.messageEvent.emit("1");
          let col = Math.floor(document.body.clientWidth / 100);
          let row = Math.floor(document.body.clientHeight / 100);
          this.messageEvent.emit(Math.floor(col*row*.192).toString());
          
        }, 1000);
        break;
      default:
      // code block
    }

    //this.classArr[num] = 'highlight';
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.startTypingAnimationInt(0);
    }, 1500);
  }

  startTypingAnimationInt(lineNum: number) {
    this.lineIndex += 1;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < this.textToTypeArr[lineNum].length) {
        this.typingTextArr[lineNum] += this.textToTypeArr[lineNum].charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        if (i === this.textToTypeArr[lineNum].length) {
          if (lineNum < this.textToTypeArr.length - 1) {
            this.updateLine(lineNum);
            this.startTypingAnimationInt(lineNum + 1);
          }
        }
      }
    }, 100);
  }
  @Input() toggle!: boolean;
  ngOnChanges() {
    if (this.toggle) {
      this.classArr = this.classArr.map(str => str + ' white');
    } else {
      this.classArr = this.classArr.map(str => str.replace(' white', ''));
    }
    
  }
}
