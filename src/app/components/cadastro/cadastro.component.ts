import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  
  public formCadastro:FormGroup

  public name: string="";
  public address: string="";
  public identifier: string="";
  public password: string="";
  public birthDate = new Date()
  public email:string=""


  constructor(private http: HttpClient, private toast:ToastrService,private route: Router,private fb:FormBuilder,  ){
  this.formCadastro = this.criaFormCadastro()

  }

 public validIdentifier(control: AbstractControl): {[key: string]: boolean} | null{
    const identifierValue : string = control.value;
    const integerRegex = /^[0-9]+$/;
    if( integerRegex.test(identifierValue) &&(identifierValue.length === 11 || identifierValue.length === 14) ){
      return null;
    } 
    else{
      return { 'invalidIdentifier': true};
    }
  }

  public validDate(control: AbstractControl): {[key:string]: boolean }| null{
         const dataValue: string = control.value;
     if(!dataValue){
      
      return{'required':true }
     
    }
      
     return null;
   
    }

    public isFormControlInvalid(controlName:string):boolean{
      return !!(this.formCadastro.get(controlName)?.invalid || this.formCadastro.get(controlName)?.pristine )
    }
  
  public criaFormCadastro():FormGroup{
    return this.fb.group({
      email:["",[Validators.required, Validators.email ]],
      password:["",[Validators.required, Validators.minLength(6)]],
      name:["",[Validators.required,  ]],
      identifier:["",[Validators.required, this.validIdentifier ]],
      address: ["",[Validators.required, Validators.minLength(6)]],
      birthDate: ["", this.validDate],
      
    })
  }

  

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
           "type":"cliente"
      }
   
       this.http.post(url,bodyData).subscribe(
         res =>{
          this.toast.success("Cadastro efetuado com sucesso!");
       
       this.route.navigate(['login']);
        
          
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

