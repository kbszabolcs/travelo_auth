import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBasketComponent } from './customer-basket.component';

describe('CustomerBasketComponent', () => {
  let component: CustomerBasketComponent;
  let fixture: ComponentFixture<CustomerBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
