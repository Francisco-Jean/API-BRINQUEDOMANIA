import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import {Product} from '../shared/product.model'
import { LoginService } from './../../components/login/login.service';

@Injectable({
    //Para usar em qualquer ponto do código
    providedIn:'root'
})

export class ProductService{
    public id:string | null 
    public product:any
    constructor(private http: HttpClient, private loginService: LoginService){
        const {name, type, id} = this.loginService.getData();
        this.id = id
    }

    public listAll(): Observable<Product[]>{
        // Endpoint para a listagem dos Produtos
        const url =`${environment.baseUrlBackend}/product/listAll`
        
        /*
         * Mapear o objeto this.http.get(url) à uma lista de <Product> 
         */
        return this.http.get(url).pipe(
            map(this.mapToProducts)
        )
    }

    private mapToProducts(data: any): Array<Product>{
       //Inicializando a Lista
        const listProducts:Product[] = []
    
    /**
     * Para cada item da lista, associar o dado (data) para um novo
     * produto, e adicionar esse Produto na lista
     */

    
    data.forEach((e:any) =>
      
        
     listProducts.push(Object.assign(new Product, e))

  
     )

    return listProducts

  }
}