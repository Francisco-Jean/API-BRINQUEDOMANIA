import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/private/shared/product.service';
import { LoginService } from '../login/login.service';
import { Cart } from 'src/app/private/shared/product.model';
import { Product } from 'src/app/private/shared/product.model';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.scss']
})
export class CarrinhoComprasComponent implements OnInit {
  cart:Cart = new Cart();
  amount:number = 0;
  id:string | null;
  Products: Array<any> = [];

  constructor(private toast:ToastrService,private http: HttpClient,private productService:ProductService, private loginService: LoginService){
    const{id} = this.loginService.getData();
    this.id = id
  }

  ngOnInit(): void {
    this.loadAllCart();
  }

  loadAllCart(){
    this.productService.listAllCart(this.id).subscribe((res:any)=>{
      this.cart = res;
      console.log(this.cart);

      for (let chave of this.cart.Products!.keys()) {
        console.log(chave);
        this.productService.listById(chave).forEach((e:any) => this.Products.splice(this.Products.length, 0, e));

      }

      this.amount = this.cart.amount!;
      console.log(this.Products);
    })
    
    
  }

  efetuarVenda(pagamento: string |null){
    const url = `${environment.baseUrlBackend}/sale/register`
  
    let bodyData ={
      "idClient":this.id,
      "paymentMethod": pagamento
    
  }
  
  this.http.post(url,bodyData).subscribe(
    res =>{
      this.toast.error('Venda Efetuada!')
  },
  err =>(
    this.toast.error('Falha ao efetuar venda.')
  )
  )
  }
 
}
