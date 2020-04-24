import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddregisterjobComponent } from './addregisterjob.component';

describe('AddregisterjobComponent', () => {
  let component: AddregisterjobComponent;
  let fixture: ComponentFixture<AddregisterjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddregisterjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddregisterjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
