import { Component } from '@angular/core';

import { LoginService } from './../../components/login/login.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  name:string | null;
  type:string | null;
  id:string | null

  constructor(private loginService:LoginService){
    const{name, type, id } = this.loginService.getData();
    this.name = name
    this.type = type
    this.id = id
  }  

  loggedOut():boolean{
    if(this.name==undefined ||this.type == undefined || this.id == undefined ){
      return true
    }
      return false
  }

  logOut(){
    localStorage.clear()
  } 

  public isSeller():boolean{
    if(this.type == "Seller" ){    
      return true
    }
    return false
  } 

  public isClient():boolean{
    if(this.type == "Client" ){
      return true
    }
    return false
  }

  public notLogged():boolean{
    if(this.type == null ){    
      return true
    }
    return false
  }

  public isManeger():boolean{
    if(this.type =="Manager" ){
      return true
   }
   return false
   } 
}


