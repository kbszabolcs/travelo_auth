import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantagesSectionComponent } from './advantages-section.component';

describe('AdvantagesSectionComponent', () => {
  let component: AdvantagesSectionComponent;
  let fixture: ComponentFixture<AdvantagesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvantagesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvantagesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
