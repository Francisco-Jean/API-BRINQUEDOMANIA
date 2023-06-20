import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService } from '.././components/login/login.service';

@Injectable()
export class AutorizadoGuard  implements CanActivate{
type:string | null;

  constructor(private loginService: LoginService, private router: Router, ) {

    const{ name,type,id} = this.loginService.getData()
    
    this.type = type

  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
      if(this.type ==='Seller' ){
      
        return true
    }
    else{
 return false
    }
   

}
}
