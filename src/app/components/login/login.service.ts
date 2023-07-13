import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { environment } from "src/environments/environment";
//import { error } from "console";

@Injectable({
    providedIn:'root',
})

export class LoginService{

    constructor(private httpClient: HttpClient){
 
    }

    public login(email:string, password:string): Observable<any>{
              
       //const url = `${environment.baseUrlBackend}/user/login`;
       const url = `${environment.baseUrlBackend}/login`;
       
       return this.httpClient.post( url,{email, password}, {responseType:'json'}).pipe(
            map((data) => this.setDataLocalStorage(data) ),
            

           catchError((err)=>{
            this.removerDataLocalStorage();

            throw 'Falha ao efetuar Login'
        })
        )
    }


   private setDataLocalStorage(response: any):void{
        
        const { type, id, name, identifier, address, birthDate} = response;
        localStorage.setItem(environment.type, type);
        localStorage.setItem(environment.id, id);
        localStorage.setItem(environment.name, name);
        localStorage.setItem(environment.identifier, identifier);
        localStorage.setItem(environment.address, address);
        localStorage.setItem(environment.birthDate, birthDate);
              
              
   }

   private removerDataLocalStorage():void{
     
    localStorage.removeItem(environment.name),
     localStorage.removeItem(environment.type), 
     localStorage.removeItem(environment.id),
     localStorage.removeItem(environment.identifier) 

   }



   public getData():{name:string | null; type:string | null;id :string | null;identifier :string | null;address :string | null;birthDate :string | null;}{
    
       return {
       name: localStorage.getItem(environment.name),
       type: localStorage.getItem(environment.type), 
       id: localStorage.getItem(environment.id), 
       identifier:localStorage.getItem(environment.identifier),
       address:localStorage.getItem(environment.address),
       birthDate:localStorage.getItem(environment.birthDate)
       } ;
   }
}