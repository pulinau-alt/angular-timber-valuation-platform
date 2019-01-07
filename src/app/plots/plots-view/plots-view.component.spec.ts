import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsViewComponent } from './plots-view.component';

describe('PlotsViewComponent', () => {
  let component: PlotsViewComponent;
  let fixture: ComponentFixture<PlotsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
