import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-animation',
  template: ` <div>
    <section class="hidden" id='intro'>
      <app-typing-animation
        (messageEvent)="receiveMessage($event)"
        [toggle]="this.toggle">
      </app-typing-animation>
    </section>

    <section>
      <h1
      class="hidden left"
      [ngClass]="classArr[0]"
      ><u>Experience</u></h1>

      <div style="display: flex; flex-grow: grow" class="container" [ngClass]="{'center':desktop}">
        <app-card
        *ngFor="let element of data; let i = index"
          [data]="this.data[i]"
          style="transition-delay: {{i*200}}ms;"
          class="hidden left card"
          [ngClass]="{'flipable': i === 3}">
        </app-card>
      </div>

    </section>
    <section>
      <h1
      class="hidden right"
      [ngClass]="classArr[0]"
      ><u>About Me</u></h1>

      <div
      style="display: flex; flex-grow: grow"
      class="container"
      [ngClass]="{'center':desktop}">
        <app-card
        *ngFor="let element of dataAboutMe; let i = index"
          [data]="this.dataAboutMe[i]"
          style="transition-delay: {{i*200}}ms;"
          class="hidden right card"
          [ngClass]="{'flipable': i === 3}">
        </app-card>
      </div>
      <app-action-button class="hidden bottom"></app-action-button>
    </section>
  </div>`,
  styleUrls: ['./scroll-animation.component.css'],
})
export class ScrollAnimationComponent {
  classArr = [''];
  desktop = false;
  ngAfterViewInit() {
    document.querySelectorAll('.hidden').forEach((element) => {
      this.observer.observe(element);
    });
  }
  ngOnInit(): void {
    this.desktop = (window.innerWidth > 1150)? true: false;
    window.addEventListener('resize', () => {
      this.desktop = (window.innerWidth > 1150)? true: false;});
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
         } //else if(this.desktop){
        //   entry.target.classList.remove('show');
        // }
      });
    },
    { rootMargin: '0px 0px 0px 0px' }
  );

  

  constructor() { }

  @Output() messageEvent = new EventEmitter<string>();
  receiveMessage($event: any) {
    this.messageEvent.emit($event)
  }
  @Input() toggle!: boolean;
  ngOnChanges() {
    if (this.toggle === undefined) {
      return;
    }
    if (this.toggle) {
      this.classArr = this.classArr.map(str => str + ' white');
    } else {
      this.classArr = this.classArr.map(str => str.replace(' white', ''));
    }
  }

  data = [
    {
      'emoji': '👨‍🏫',
      'title': 'TA/Researcher',
      'subtitle':
        `"Teaching assistant for the Introductory to C++ course, along with doing research based and allocation algorithms."`,
      'tags': ['C++', 'Java', 'Python', 'Teaching', 'Communication']
    },
    {
      'emoji': '🧠',
      'title': 'R&D Intern',
      'subtitle':
        `"Oversaw the operation of mechanical component testing stations, and designed a system to automate tasks on Excel."`,
      'tags': ['Excel', 'Automation', 'Networking']
    },
    {
      'emoji': '⚙️',
      'title': 'Backend Developer',
      'subtitle':
        `"Implemented operating system level security updates, and stakeholder requests"`,
      'tags': ['C/C++', 'Bash', 'Linux/Unix', 'GitHub', 'Security', 'Translations/Globalization']
    },
    {
      'emoji': '💻',
      'back': '🔮',
      'title': 'Frontend Developer',
      'subtitle':
        `"Help me write what happens next..."`,
      'tags': ['Angular', 'React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Agile']
    },
  ];
  dataAboutMe = [
    {
      'emoji': '🏡',
      'title': 'Minneapolis, MN',
      'subtitle':
        `"I was born in Lagos Nigeria, and move to Minneapolis, Minnesota before I turned one year old. I've lived in Austin for a year, and I'm still trying to find my footing."`,
      'tags': ['🏠 Minneapolis', '✈️ Austin', '👶 Lagos']
    },
    {
      'emoji': '🧘‍♂️',
      'title': 'Hobbies',
      'subtitle':
        `"I'm interested in basically everything, as of lately, I've been focusing on living a more mindful life."`,
      'tags': ['🙏 Meditation', '🧗‍♂️ Rockclimbing', '🏋️ Gym','🕉️ Yoga', ]
    },
    {
      'emoji': '️👀',
      'title': 'Interests',
      'subtitle':
        `"Most of my interests are in the intersection of technology and humanity."`,
      'tags': ['⚛️ Quantum Computing', '👾 Crypto/Web3', '🧠 AI',]
    },
  ];

}
