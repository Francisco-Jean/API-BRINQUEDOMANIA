import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/private/shared-venda/sale.service';
import { LoginService } from 'src/app/components/login/login.service';
import { Sale } from 'src/app/private/shared-venda/sale.model';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/product.model';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-lista-vendas-vendedor',
  templateUrl: './lista-vendas-vendedor.component.html',
  styleUrls: ['./lista-vendas-vendedor.component.scss']
})
export class ListaVendasVendedorComponent implements OnInit{

  public formSale : FormGroup;
  
  //   cart:Cart = new Cart();
  //   amount:number = 0;
  id:string | null;
  Sale: Array<Sale> = [];
  public date: string | null
  namesProducts: Map< string ,Array<String>> = new Map< string,Array<String>>();

  constructor(private fb:FormBuilder, private http: HttpClient, private loginService: LoginService, private productService: ProductService){
    this.date = ""
    this.formSale = this.buildFormSale()
    const{id} = this.loginService.getData();
    this.id = id 
  }

  private buildFormSale():FormGroup{
    return this.fb.group({
      date:[null,[Validators.required,]],
    })
}

  ngOnInit(): void {
    this.listBy();
  }

  listBy(){
    const url = `${environment.baseUrlBackend}/sale/listBy`
  
    let bodyData ={
      "form": "seller",
      "value": this.id
    }

    this.http.post(url, bodyData).subscribe((res:any)=>{
      this.Sale = res;
      console.log(this.Sale)

      for(let sale of this.Sale){
        let produtos = new Map<string, number>(Object.entries(sale.products!));
        let names = new Array<String>();
        const observables = [];

for (let [key, value] of produtos) {
  observables.push(this.productService.listById(key));
}

forkJoin(observables).subscribe((results: any[]) => {
  let names = results.map((produto: any) => produto.name);
  let id = sale.id;
  this.namesProducts.set(id as string ,names);
});
      }
    })  
    console.log(this.date)
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formSale.get(controlName)?.invalid || this.formSale.get(controlName)?.pristine )
  }

  public nameExists(name: string |null): boolean{
    if (name === undefined){
      return false
    }
    return true
  }

}