import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefromtypeComponent } from './updatefromtype.component';

describe('UpdatefromtypeComponent', () => {
  let component: UpdatefromtypeComponent;
  let fixture: ComponentFixture<UpdatefromtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatefromtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefromtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
