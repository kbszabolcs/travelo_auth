import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedSectionComponent } from './recommended-section.component';

describe('RecommendedSectionComponent', () => {
  let component: RecommendedSectionComponent;
  let fixture: ComponentFixture<RecommendedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
