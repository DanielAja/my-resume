import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundGridComponent } from './background-grid.component';

describe('BackgroundGridComponent', () => {
  let component: BackgroundGridComponent;
  let fixture: ComponentFixture<BackgroundGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackgroundGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
