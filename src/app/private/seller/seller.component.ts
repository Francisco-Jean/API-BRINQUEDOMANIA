import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from './../../components/login/login.service';
import { catchError,tap, throwError } from 'rxjs';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { error } from 'console';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {
  public formCadastroProduto: FormGroup;

  public name: string ="";
  public category: string="";
  public value:string="";
  public description: string="";
  public id: string | null;
  public imageLink: string=""

  constructor(private http: HttpClient, private toast: ToastrService, private route: Router, private fb: FormBuilder, private loginService:LoginService){
    this.formCadastroProduto = this.criaFormCadastro()

    const {name, type, id} = this.loginService.getData();
    this.id = id
  }
  
  public criaFormCadastro(): FormGroup{
    return this.fb.group({
     name:["",[Validators.required,  ]],
     category:["",[Validators.required,  ]],
     value:["",[Validators.required,  ]],
     description:["",[Validators.required,  ]],
     imageLink:["",[Validators.required,  ]],
    })
  }

  public register(){
    
    const url = `${environment.baseUrlBackend}/product/register`;
    let bodyData ={
      "name": this.name,
      "category": this.category,
      "value": this.value,
      "description": this.description,
      "idSeller": this.id,
      "imageLink":"https://external-content.duckduckgo.com"

    }

    this.http.post(url,bodyData).subscribe(
       res=>{
        this.toast.success("Cadastro efetuado com sucesso!");
      },
      err=>(
        this.toast.error('Falha ao efetuar Cadastro')
         
      )
    )
    

  }

  save(){
    this.register()
  }

}
