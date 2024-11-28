import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { songGuard } from './song.guard';

describe('songGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => songGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
