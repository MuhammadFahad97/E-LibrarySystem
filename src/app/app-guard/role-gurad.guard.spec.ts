import { TestBed } from '@angular/core/testing';

import { RoleGuradGuard } from './role-gurad.guard';

describe('RoleGuradGuard', () => {
  let guard: RoleGuradGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuradGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
