import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcComponentComponent } from './abc-component.component';

describe('AbcComponentComponent', () => {
  let component: AbcComponentComponent;
  let fixture: ComponentFixture<AbcComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
