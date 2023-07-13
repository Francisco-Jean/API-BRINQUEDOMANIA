import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autorizadoManagerGuard } from './autorizado-manager.guard';

describe('autorizadoManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autorizadoManagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
