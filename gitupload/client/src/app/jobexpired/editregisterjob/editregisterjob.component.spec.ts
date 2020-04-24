import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditregisterjobComponent } from './editregisterjob.component';

describe('EditregisterjobComponent', () => {
  let component: EditregisterjobComponent;
  let fixture: ComponentFixture<EditregisterjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditregisterjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditregisterjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
