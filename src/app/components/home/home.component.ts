import { map } from 'rxjs';
import { ProductService } from './../../private/shared/product.service';
import { SellerService } from '../../private/shared-vendedor/seller.service';
import { LoginService } from './../login/login.service';
import {  CadastroComponent } from './../cadastro/cadastro.component';
import { Component, OnInit } from '@angular/core';
import { Router, mapToCanActivate } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations'
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('fadeIn',[
      state('void', style({opacity:0})),
      transition(':enter', [
        animate('1s', style({opacity:1}))
      ])
    ]),
  
 
 
    trigger('scale', [
      state('void', style({ transform: 'scale(0)' })),
      transition(':enter', [
        animate('500ms', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  name:string | null;
  type:string | null;
  id:string | null;
  productId: any
  quantity:number
  productList: any [] =[]
  constructor(private loginService:LoginService,private route:Router, private productService:ProductService, private toast: ToastrService) {

  const{name, type, id } = this.loginService.getData();
  this.name = name
  this.type = type
  this.id = id

  this.quantity = 1

  }
  
  ngOnInit(): void {
    this.loadAllProducts(); 
  }


  loadAllProducts(){
    this.productService.listAll().subscribe((res:any)=>{
    this.productList = res;
    })
  }
  addItemToCart(productId: string){
   
   let bodyData ={
      "idClient": this.id,
     "idProducts": {[productId]:this.quantity }, 
      
    }
    
    this.productService.addToCart(bodyData).subscribe(
      res =>{
        this.toast.success("Produto colocado no carrinho com sucesso!");
     
     this.route.navigate(['home']);
      
        
     },
     err =>(
       this.toast.error('erro')
     )
   )
  
}
save(productId: string){
  
  this.addItemToCart(productId)
}
 
  public isClient():boolean{
    if(this.type == "Client"){
      return true
    }
    return false
  }

  public notLogged():boolean{
    if(this.type == null){
      return true
    }
    return false
  }

  public isSeller():boolean{
    if(this.type == "Seller" ){    
      return true
    }
    return false
  }

  public isManager():boolean{
    if(this.type == "Manager"){
      return true
    }
    return false
  }
}
