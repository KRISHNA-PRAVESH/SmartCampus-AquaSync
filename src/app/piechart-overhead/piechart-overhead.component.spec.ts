import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartOverheadComponent } from './piechart-overhead.component';


describe('PiechartOverheadComponent', () => {
  let component: PiechartOverheadComponent;
  let fixture: ComponentFixture<PiechartOverheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartOverheadComponent]
    });
    fixture = TestBed.createComponent(PiechartOverheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
