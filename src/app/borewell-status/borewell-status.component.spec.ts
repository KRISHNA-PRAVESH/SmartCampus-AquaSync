import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorewellStatusComponent } from './borewell-status.component';

describe('BorewellStatusComponent', () => {
  let component: BorewellStatusComponent;
  let fixture: ComponentFixture<BorewellStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorewellStatusComponent]
    });
    fixture = TestBed.createComponent(BorewellStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
