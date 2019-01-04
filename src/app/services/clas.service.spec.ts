import { TestBed } from '@angular/core/testing';

import { ClasService } from './clas.service';

describe('ClasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasService = TestBed.get(ClasService);
    expect(service).toBeTruthy();
  });
});
