import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDeatilsComponent } from './trip-deatils.component';

describe('TripDeatilsComponent', () => {
  let component: TripDeatilsComponent;
  let fixture: ComponentFixture<TripDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
