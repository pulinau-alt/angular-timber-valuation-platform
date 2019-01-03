import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlotComponent } from './view-plot.component';

describe('ViewPlotComponent', () => {
  let component: ViewPlotComponent;
  let fixture: ComponentFixture<ViewPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
