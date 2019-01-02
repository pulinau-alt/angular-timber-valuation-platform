import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListViewComponent } from './price-list-view.component';

describe('PriceListViewComponent', () => {
  let component: PriceListViewComponent;
  let fixture: ComponentFixture<PriceListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
