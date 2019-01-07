import { TestBed, async, inject } from '@angular/core/testing';

import { FieldOfficerGuard } from './field-officer.guard';

describe('FieldOfficerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldOfficerGuard]
    });
  });

  it('should ...', inject([FieldOfficerGuard], (guard: FieldOfficerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
