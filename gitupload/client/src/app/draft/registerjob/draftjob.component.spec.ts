import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftjobComponent } from './draftjob.component';

describe('DraftjobComponent', () => {
  let component: DraftjobComponent;
  let fixture: ComponentFixture<DraftjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
