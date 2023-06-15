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

    public login(username:string, password:string): Observable<any>{
              
       const url = `${environment.baseUrlBackend}/login`;
       
       return this.httpClient.post( url,{username, password}, {responseType:'json'}).pipe(
            map((data) => this.setTokenLocalStorage(data)),

           catchError((err)=>{
            this.removerTokenLocalStorage();
            const errorMessage = 'Falha ao efetuar Login';
            console.error(errorMessage, err); // Log the error for debugging purposes
            throw new Error(errorMessage);
        })
        )
    }

   public getToken():string | null{
       return localStorage.getItem(environment.token);
   }
   private setTokenLocalStorage(response: any):void{
              const { type, token, _} = response;
              localStorage.setItem(environment.token, token);
   }

   private removerTokenLocalStorage():void{
             localStorage.removeItem(environment.token);
   }
}