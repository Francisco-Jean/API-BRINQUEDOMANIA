import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/private/shared/product.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.scss']
})
export class CarrinhoComprasComponent implements OnInit {

  id:string | null;
  cartList: any [] =[]
  constructor(private productService:ProductService, private loginService: LoginService){
    const{id} = this.loginService.getData();
    this.id = id
  }

  ngOnInit(): void {
    this.loadAllCart();
  }

  loadAllCart(){
    this.productService.listAllCart(this.id).subscribe((res:any)=>{
    this.cartList = res;
    })
    console.log(this.cartList);
  }
}
