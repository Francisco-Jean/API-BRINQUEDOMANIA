import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Observable, catchError, map } from "rxjs";
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})

export class CadastroComponent {
  
  public formCadastro:FormGroup

  public name: string="";
  public address: string="";
  public identifier: string="";
  public password: string="";
  public birthDate = new Date()
  public email:string=""
  public idClient:string|null


  constructor(private http: HttpClient, private toast:ToastrService,private route: Router,private fb:FormBuilder,  ){
  this.formCadastro = this.criaFormCadastro()

  const{id} = this.getData()
  this.idClient = id

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

    public isControlInvalid(controlName:string):boolean{
      return !!(this.formCadastro.get(controlName)?.invalid && this.formCadastro.get(controlName)?.touched )
    }
  
  public criaFormCadastro():FormGroup{
    return this.fb.group({
      email:["",[Validators.required, Validators.email ]],
      password:["",[Validators.required, Validators.minLength(6)]],
      name:["",[Validators.required,  Validators.minLength(3), Validators.pattern('[a-zA-Z ]*') ]],
      identifier:["",[Validators.required, this.validIdentifier ]],
      address: ["",[Validators.required, Validators.minLength(6)]],
      birthDate: ["", Validators.required,],
      
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

  public submitForm(){
   

    this.register().subscribe(
      res =>{
      
       this.toast.success("Cadastro efetuado com sucesso!");
    
    this.route.navigate(['login']);
     
       
    },
    err =>(
      this.toast.error('Falha ao efetuar Cadastro')
    )
    )
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
           "type":"Client"
      }
   
   return this.http.post(url, bodyData).pipe(
    map((data) => this.setDataLocalStorage(data)),
    
    catchError((err)=>{
      this.removerDataLocalStorage();
      throw "Falha ao efetuar o Cadastro"
    })
   )
}


public createCart(){
  const url = `${environment.baseUrlBackend}/cart/creat`



  let bodyData ={
    "idClient":this.idClient,
    "idsProducts": {}
  
}

this.http.post(url,bodyData).subscribe(
  res =>{
  
},
err =>(
  this.toast.error('erro no carrinho')
)
)
}




save(){
 
  this.submitForm()
  this.createCart()
}

private setDataLocalStorage(response: any):void{
        
  const { type, id, name} = response;
  localStorage.setItem(environment.type, type);
  localStorage.setItem(environment.id, id);
  localStorage.setItem(environment.name, name);
        
        
}

public getData():{name:string | null; type:string | null;id :string | null;}{
    
  return {
  name: localStorage.getItem(environment.name),
  type: localStorage.getItem(environment.type), 
  id: localStorage.getItem(environment.id), 
  } ;
}


private removerDataLocalStorage():void{
     
  localStorage.removeItem(environment.name),
   localStorage.removeItem(environment.type), 
   localStorage.removeItem(environment.id) 

 }

}



