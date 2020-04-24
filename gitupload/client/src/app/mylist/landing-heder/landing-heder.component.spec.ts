import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHederComponent } from './landing-heder.component';

describe('LandingHederComponent', () => {
  let component: LandingHederComponent;
  let fixture: ComponentFixture<LandingHederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingHederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
