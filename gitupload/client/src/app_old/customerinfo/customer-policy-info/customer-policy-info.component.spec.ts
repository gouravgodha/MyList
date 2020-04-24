import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPolicyInfoComponent } from './customer-policy-info.component';

describe('CustomerPolicyInfoComponent', () => {
  let component: CustomerPolicyInfoComponent;
  let fixture: ComponentFixture<CustomerPolicyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPolicyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPolicyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
