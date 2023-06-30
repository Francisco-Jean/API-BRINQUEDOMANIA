import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from './../../components/login/login.service';
import { catchError,tap, throwError } from 'rxjs';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
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
 public imageLink: string;

  constructor(private http: HttpClient, private toast: ToastrService, private route: Router, private fb: FormBuilder, private loginService:LoginService){
    this.formCadastroProduto = this.criaFormCadastro()

    const {name, type, id} = this.loginService.getData();
    this.id = id

    this.imageLink = ''
  }

  // Irá lidar com o evento da seleção do arquivo e irá
  // estabelecer o arquivo no form control:
  /*
       selectImage(event: any){
  this.imageLink = event?.target.files[0]
}
  */

  public criaFormCadastro(): FormGroup{
    return this.fb.group({
     name:["",[Validators.required, Validators.minLength(3) ]],
     category:["",[Validators.required,  ]],
     value:["",[Validators.required, Validators.pattern(/^\d{1,5}\.\d{2}$/)  ]],
     description:["",[Validators.required, Validators.minLength(10) ]],
     imageLink:["",[Validators.required,  ]],
    })
  }



  public register(){
    //const formData: FormData = new FormData
    //formData.append('imageLink', this.imageLink)
    
    const url = `${environment.baseUrlBackend}/product/register`;
    let bodyData ={
      "name": this.name,
      "category": this.category,
      "value": this.value,
      "description": this.description,
      "idSeller": this.id,
      "imageLink": this.imageLink

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
