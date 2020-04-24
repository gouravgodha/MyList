import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyjobComponent } from './companyjob.component';

describe('CompanyjobComponent', () => {
  let component: CompanyjobComponent;
  let fixture: ComponentFixture<CompanyjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
