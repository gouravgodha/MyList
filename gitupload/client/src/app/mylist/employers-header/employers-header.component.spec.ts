import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersHeaderComponent } from './employers-header.component';

describe('EmployersHeaderComponent', () => {
  let component: EmployersHeaderComponent;
  let fixture: ComponentFixture<EmployersHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployersHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
