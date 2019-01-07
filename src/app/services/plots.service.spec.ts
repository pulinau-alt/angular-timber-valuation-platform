import { TestBed } from '@angular/core/testing';

import { PlotsService } from './plots.service';

describe('PlotsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlotsService = TestBed.get(PlotsService);
    expect(service).toBeTruthy();
  });
});
