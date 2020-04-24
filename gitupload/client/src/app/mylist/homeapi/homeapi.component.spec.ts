import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeapiComponent } from './homeapi.component';

describe('HomeapiComponent', () => {
  let component: HomeapiComponent;
  let fixture: ComponentFixture<HomeapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
