import { TestBed } from '@angular/core/testing';

import { PriceListService } from './price-list.service';

describe('PriceListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceListService = TestBed.get(PriceListService);
    expect(service).toBeTruthy();
  });
});
