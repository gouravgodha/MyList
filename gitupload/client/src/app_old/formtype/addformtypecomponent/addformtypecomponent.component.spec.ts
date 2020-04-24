import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddformtypecomponentComponent } from './addformtypecomponent.component';

describe('AddformtypecomponentComponent', () => {
  let component: AddformtypecomponentComponent;
  let fixture: ComponentFixture<AddformtypecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddformtypecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddformtypecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
