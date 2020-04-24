import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtypecomponentComponent } from './formtypecomponent.component';

describe('FormtypecomponentComponent', () => {
  let component: FormtypecomponentComponent;
  let fixture: ComponentFixture<FormtypecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtypecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtypecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
