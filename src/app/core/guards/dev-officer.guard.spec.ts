import { TestBed, async, inject } from '@angular/core/testing';

import { DevOfficerGuard } from './dev-officer.guard';

describe('DevOfficerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevOfficerGuard]
    });
  });

  it('should ...', inject([DevOfficerGuard], (guard: DevOfficerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
