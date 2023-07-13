import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/private/shared-venda/sale.service';
import { LoginService } from 'src/app/components/login/login.service';
import { Sale } from 'src/app/private/shared-venda/sale.model';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb:FormBuilder, private http: HttpClient, private loginService: LoginService){
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
    })  
    console.log(this.date)
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formSale.get(controlName)?.invalid || this.formSale.get(controlName)?.pristine )
  }

}