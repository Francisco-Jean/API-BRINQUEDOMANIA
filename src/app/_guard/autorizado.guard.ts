import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '.././components/login/login.service';

@Injectable()
export class AutorizadoGuard implements CanActivate {
type:string | null;

  constructor(private loginService: LoginService, private router: Router) {

    const{ name,type,id} = this.loginService.getData()
    
    this.type = type

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
    if(this.type ==='seller' ){
        this.router.navigate(['/seller'])
        return true
    }
    
    this.router.navigate(['/home'])
    return false
}
}
