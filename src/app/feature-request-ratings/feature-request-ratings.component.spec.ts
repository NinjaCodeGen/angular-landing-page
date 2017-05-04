import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRequestRatingsComponent } from './feature-request-ratings.component';

describe('FeatureRequestRatingsComponent', () => {
  let component: FeatureRequestRatingsComponent;
  let fixture: ComponentFixture<FeatureRequestRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureRequestRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureRequestRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
