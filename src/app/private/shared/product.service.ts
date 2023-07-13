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
  public name: string ="";
  public category: string="";
  public value:string="";
  public description: string="";
  public id: string | null;
  public imageLink: string="";
    
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

  // Para buscar o produto no momento de fazer a atualização:
  public listById(id:string|null):Observable<Product>{
    const url = `${environment.baseUrlBackend}/product/listOne/${id}`
    
    
    return this.http.get(url).pipe(
        map(this.mapToProduct)
    )
  }

  private mapToProduct(data:any):Product{
    return(Object.assign(new Product,data))
  }

  public update(product:Product):Observable<Product>{
    const url = `${environment.baseUrlBackend}/product/edit/${product.id}`

    return this.http.put(url,product).pipe(
      map(this.mapToProduct)
    )
  }

  public delete(productId:string| undefined):Observable<Product>{
    const url = `${environment.baseUrlBackend}/product/delete/${productId}`

    return this.http.delete(url, {responseType: 'json'})
  }

  public addToCart(obj:any):Observable<any>{
    const url = `${environment.baseUrlBackend}/cart/edit`

    return this.http.put(url,obj )
  }

  public createCart(obj:any): Observable<any>{
    const url = `${environment.baseUrlBackend}/cart/edit`

    return this.http.put(url,obj )
  }

  public listAllCart(id:string|null): Observable<any>{
    // Endpoint para a listagem dos Produtos
    const url =`${environment.baseUrlBackend}/cart/readByIdUser/${id}`
    
    /*
     * Mapear o objeto this.http.get(url) à uma lista de <Product> 
     */
    return this.http.get(url).pipe(
        map(this.mapToCart)
    )
  }
  private mapToCart(data: any): Array<Product>{
    //Inicializando a Lista
     const listCart:Product[] = []
 
 /**
  * Para cada item da lista, associar o dado (data) para um novo
  * produto, e adicionar esse Produto na lista
  */

 
 data.forEach((e:any) =>
     
  listCart.push(Object.assign(new Product, e))

  )

 return listCart

}
 
}