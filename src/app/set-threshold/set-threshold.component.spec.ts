import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetThresholdComponent } from './set-threshold.component';

describe('SetThresholdComponent', () => {
  let component: SetThresholdComponent;
  let fixture: ComponentFixture<SetThresholdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetThresholdComponent]
    });
    fixture = TestBed.createComponent(SetThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
