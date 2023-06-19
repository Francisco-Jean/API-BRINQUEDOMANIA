import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutorizadoGuard } from './autorizado.guard';
//import { AuthService } from './auth.service';
import { LoginService } from '.././components/login/login.service';

describe('AutorizadoGuard', () => {
  let guard: AutorizadoGuard;
  let authService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AutorizadoGuard, LoginService]
    });
    guard = TestBed.inject(AutorizadoGuard);
    authService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
})