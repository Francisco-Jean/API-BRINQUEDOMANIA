import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seller } from 'src/app/private/shared-vendedor/seller.model';
import { Product } from 'src/app/private/shared/product.model';
import { ProductService } from 'src/app/private/shared/product.service';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {
  productData: any | Product
  sellerData: any | Seller
  idsProducts: Record<string,number>
  name:string | null;
  type:string | null;
  id:string | null;
  identifier:string | null;
  address:string | null;
  birthDate:string | null;
  productId: any
  quantity:number
  productList: any [] =[]

  constructor(private loginService:LoginService ,private activeRouter: ActivatedRoute, private product: ProductService,private toast: ToastrService, private route:Router){

  this.idsProducts ={"":0}
  const{name, type, id,identifier, address,birthDate } = this.loginService.getData();
  this.name = name
  this.type = type
  this.id = id
  this.identifier = identifier
  this.address = address
  this.birthDate = birthDate
  this.quantity = 1

  }
  ngOnInit(): void {

    let productId = this.activeRouter.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.listById(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result;
    })

    let sellerId = this.activeRouter.snapshot.paramMap.get('')
    sellerId && this.product.listById(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result;
    })
  }
  addItemToCart(productId: string){
    
    let bodyData  = {
      "idClient": this.id,
      "action": "add",
     "idProduct": productId /**/
    
    }


    this.product.addToCart(bodyData).subscribe(
      res =>{
        this.toast.success("Produto colocado no carrinho com sucesso!");
     
     this.route.navigate(['carrinho']);
      
        
     },
     err =>(
       this.toast.error('erro')
     )
    )}

save(productId: string){
  console.log(this.type)
  this.addItemToCart(productId)
}
}


