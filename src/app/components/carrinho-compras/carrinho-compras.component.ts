import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/private/shared/product.service';
import { LoginService } from '../login/login.service';
import { Cart } from 'src/app/private/shared/product.model';
import { Product } from 'src/app/private/shared/product.model';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.scss']
})
export class CarrinhoComprasComponent implements OnInit {
 public formCart : FormGroup
  
  cart:Cart = new Cart();
  amount:number = 0;
  id:string | null;
  Products: Array<any> = [];
  public paymentMethod: string |null



  constructor(private fb:FormBuilder,private toast:ToastrService,private http: HttpClient,private productService:ProductService, private loginService: LoginService){
   this.paymentMethod = ""
   this.formCart = this.buildFormCart()
    const{id} = this.loginService.getData();
    this.id = id
   
    //this.formCart = this.buildFormCart()
  }

  private buildFormCart():FormGroup{
    return this.fb.group({
      paymentMethod:[null,[Validators.required,  ]],
    

    })
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

  efetuarVenda(){
    const url = `${environment.baseUrlBackend}/sale/register`
  
    let bodyData ={
      "idClient":this.id,
      "paymentMethod": this.paymentMethod
    
  }
  
  this.http.post(url,bodyData).subscribe(
    res =>{
      this.toast.success('Venda Efetuada!')
  },
  err =>(
    this.toast.error('Falha ao efetuar venda.')
  )
  )
  }

  save(){
    this.efetuarVenda()
  }
 
}
