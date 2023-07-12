import { ProductService } from './../../private/shared/product.service';
import { SellerService } from '../../private/shared-vendedor/seller.service';
import { LoginService } from './../login/login.service';
import {  CadastroComponent } from './../cadastro/cadastro.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations'

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
  
  productList: any [] =[]
  constructor(private loginService:LoginService,private route:Router, private productService:ProductService) {

  const{name, type, id } = this.loginService.getData();
  this.name = name
  this.type = type
  this.id = id
 }

  ngOnInit(): void {
    this.loadAllProducts(); 
  }

  loadAllProducts(){
    this.productService.listAll().subscribe((res:any)=>{
    this.productList = res;
    })
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
