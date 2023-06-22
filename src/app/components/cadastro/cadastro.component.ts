import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {


//  public formCadastro:FormGroup;
  






  name: string="";
  address: string="";
  identifier: string="";
  password: string="";
  birthDate = new Date()
  email:string=""

  constructor(private http: HttpClient, private toast:ToastrService,private route: Router,private fb:FormBuilder ){
  //this.formCadastro = this.criaFormCadastro()

  }
  /** 

  public criaFormCadastro():FormGroup{
    return this.fb.group({
      email:["",[Validators.required, Validators.minLength(6) ]],
      password:["",[Validators.required, Validators.minLength(6)]],
    })
  }

 */ 

  clearData(){
    this.name="";
    this.address="";
    this.identifier="";
    this.password="";
    this.birthDate = new Date()
    this.email=""
  }

  public register(){
    const url = `${environment.baseUrlBackend}/user/register`;       
        let bodyData ={
          "name":this.name,
          "email":this.email,
          "birthDate":this.birthDate,
          "address":this.address,
          "password":this.password,
           "identifier":this.identifier,
      }
   
       this.http.post(url,bodyData, {responseType:'json'}).subscribe(
         res =>{
          this.toast.success("Cadastro efetuado com sucesso!");
       
       this.route.navigate(['home']);
        
          
       },
       err =>(
         this.toast.error('Falha ao efetuar Cadastro')
       )
       )
}

save(){
  this.register()
}
}
