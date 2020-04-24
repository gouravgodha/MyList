import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterjobComponent } from './registerjob.component';

describe('RegisterjobComponent', () => {
  let component: RegisterjobComponent;
  let fixture: ComponentFixture<RegisterjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
