import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { error } from "console";

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
            map((data) => this.setIdLocalStorage(data) ),
            

           catchError((err)=>{
            this.removerIdLocalStorage();
            const errorMessage = 'Falha ao efetuar Login';
            console.error(errorMessage, err); // Log the error for debugging purposes
            throw new Error(errorMessage);
        })
        )
    }


   public getId():string | null{
       return localStorage.getItem(environment.id);
   }
   private setIdLocalStorage(response: any):void{
              const { type, id, _} = response;

              localStorage.setItem(environment.id, id);
              
   }

   private removerIdLocalStorage():void{
             localStorage.removeItem(environment.id);
   }

   private setNameLocalStorage(response:any):void{
      const {type, name, _} = response;
      localStorage.setItem(environment.name,name)
   }
   public getName():string | null{
    return localStorage.getItem(environment.name);
}


}