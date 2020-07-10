import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsChartComponent } from './spreads-chart.component';

describe('SpreadsChartComponent', () => {
  let component: SpreadsChartComponent;
  let fixture: ComponentFixture<SpreadsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
