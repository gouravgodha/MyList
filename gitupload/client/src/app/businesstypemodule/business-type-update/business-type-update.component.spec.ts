import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypeUpdateComponent } from './business-type-update.component';

describe('BusinessTypeUpdateComponent', () => {
  let component: BusinessTypeUpdateComponent;
  let fixture: ComponentFixture<BusinessTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
