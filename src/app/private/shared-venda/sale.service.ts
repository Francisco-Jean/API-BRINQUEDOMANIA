import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import {Sale} from './sale.model';
import { LoginService } from '../../components/login/login.service';

@Injectable({
    //Para usar em qualquer ponto do código
    providedIn:'root'
})

export class SaleService{
    public id: string | null;
    public idSeller: string="";
    public idClient: string="";
    public amount: string="";
    public date: string="";
    
    constructor(private http: HttpClient, private loginService: LoginService){
        const {id} = this.loginService.getData();
        this.id = id
    }

    public listBy(): Observable<Sale[]>{
        // Endpoint para a listagem dos Produtos
        const url =`${environment.baseUrlBackend}/sale/listBy`
        
        /*
         * Mapear o objeto this.http.get(url) à uma lista de <Product> 
         */
        return this.http.get(url).pipe(
            map(this.mapToSale)
        )
    }

    private mapToSale(data: any): Array<Sale>{
       //Inicializando a Lista
        const listSale:Sale[] = []
    
    data.forEach((e:any) =>
        
     listSale.push(Object.assign(new Sale, e))

     )

    return listSale

  }


}