import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumpTankStatusComponent } from './sump-tank-status.component';

describe('SumpTankStatusComponent', () => {
  let component: SumpTankStatusComponent;
  let fixture: ComponentFixture<SumpTankStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumpTankStatusComponent]
    });
    fixture = TestBed.createComponent(SumpTankStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
