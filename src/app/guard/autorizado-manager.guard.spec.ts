import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutorizadoManagerGuard } from './autorizado-manager.guard';
//import { AuthService } from './auth.service';
import { LoginService } from '.././components/login/login.service';

describe('AutorizadoManagerGuard', () => {
  let guard: AutorizadoManagerGuard;
  let authService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AutorizadoManagerGuard, LoginService]
    });
    guard = TestBed.inject(AutorizadoManagerGuard);
    authService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
})