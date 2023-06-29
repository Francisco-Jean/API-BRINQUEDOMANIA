import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service'
import { Product } from '../shared/product.model';
import { LoginService } from './../../components/login/login.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public listProducts:Array<Product>= []
  
  public id: string |null
  constructor(private productService: ProductService, private loginService: LoginService ){
    const {name, type, id} = this.loginService.getData();
    this.id = id
  }

  ngOnInit():void{
    
    // Se inscrever no Observable para poder
    // extrair a informação que está vindo
    this.productService.listAll().subscribe(
     
         res =>{
          this.listProducts = res.filter(( product: Product) =>
            product.idSeller === this.id
          )
        }
    )
    
  }

  public removerProduct(ProductId: string| undefined){
    console.log("remover product ", ProductId)
  }
}
