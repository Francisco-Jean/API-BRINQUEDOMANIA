import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import {Seller} from './seller.model';
import { LoginService } from '../../components/login/login.service';

@Injectable({
    //Para usar em qualquer ponto do código
    providedIn:'root'
})

export class SellerService{
  public name: string ="";
  public identifier: string="";
  public id: string | null;
  public password: string="";
  public email: string="";
  public address: string="";
  public birt_date: string="";
    
    constructor(private http: HttpClient, private loginService: LoginService){
        const {name, type, id} = this.loginService.getData();
        this.id = id
    }

    public listByType(): Observable<Seller[]>{
        // Endpoint para a listagem dos Produtos
        const url =`${environment.baseUrlBackend}/user/listByType/Seller`
        
        /*
         * Mapear o objeto this.http.get(url) à uma lista de <Product> 
         */
        return this.http.get(url).pipe(
            map(this.mapToSellers)
        )
    }

    private mapToSellers(data: any): Array<Seller>{
       //Inicializando a Lista
        const listSellers:Seller[] = []
    
    /**
     * Para cada item da lista, associar o dado (data) para um novo
     * produto, e adicionar esse Produto na lista
     */

    
    data.forEach((e:any) =>
        
     listSellers.push(Object.assign(new Seller, e))

     )

    return listSellers

  }

  // Para buscar o produto no momento de fazer a atualização:
  public listById(id:string|null):Observable<Seller>{
    const url = `${environment.baseUrlBackend}/user/listOne/${id}`

    
    return this.http.get(url).pipe(
        map(this.mapToSeller)
    )
  }

  private mapToSeller(data:any):Seller{
    return(Object.assign(new Seller,data))
  }

  public update(seller:Seller):Observable<Seller>{
    const url = `${environment.baseUrlBackend}/user/edit/${seller.id}`

    return this.http.put(url,seller).pipe(
      map(this.mapToSeller)
    )
  }

  public delete(sellerId:string| undefined):Observable<Seller>{
    const url = `${environment.baseUrlBackend}/user/delete/${sellerId}`

    return this.http.delete(url, {responseType: 'json'})
  }

}