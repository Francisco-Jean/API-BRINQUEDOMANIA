import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service'
import { Product } from '../shared/product.model';
import { LoginService } from '../../components/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

declare var bootstrap:any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, AfterViewInit {

  public listProducts:Array<Product>= []
  
  public id: string |null
  constructor(private productService: ProductService, private loginService: LoginService, private toastr: ToastrService ){
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

  ngAfterViewInit(): void {
      const tooltip1 = [].slice.call(document.querySelectorAll('#tooltip'));
      tooltip1.map(function(tooltip:any){
        return new bootstrap.Tooltip(tooltip)
      })

  }

  public removerProduct(productId:string|undefined){
   
    if(!window.confirm(`Deseja exculir o produto de id: ${productId}?`)){
      return
    }
   
    this.productService.delete(productId).subscribe(
      error => {
        this.toastr.error('Erro ao deletar produto.');
      },
      res => {
        this.toastr.success('Produto deletado com sucesso!');
        
      }
    );
  

}

}