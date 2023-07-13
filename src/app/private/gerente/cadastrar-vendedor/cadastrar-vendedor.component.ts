import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError,tap, throwError } from 'rxjs';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms'
import { error } from 'console';

@Component({
  selector: 'app-cadastrar-vendedor',
  templateUrl: './cadastrar-vendedor.component.html',
  styleUrls: ['./cadastrar-vendedor.component.scss']
})
export class CadastrarVendedorComponent {
  public formCadastroVendedor: FormGroup;

  public name: string="";
  public address: string="";
  public identifier: string="";
  public password: string="";
  public birthDate = new Date()
  public email:string=""

  constructor(private http: HttpClient, private toast: ToastrService, private route: Router, private fb: FormBuilder){

    this.formCadastroVendedor = this.criaFormCadastro()
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
      return !!(this.formCadastroVendedor.get(controlName)?.invalid || this.formCadastroVendedor.get(controlName)?.pristine )
    }

    public isControlInvalid(controlName:string):boolean{
      return !!(this.formCadastroVendedor.get(controlName)?.invalid && this.formCadastroVendedor.get(controlName)?.touched )
    }
  
  public criaFormCadastro():FormGroup{
    return this.fb.group({
      email:["",[Validators.required, Validators.email ]],
      password:["",[Validators.required, Validators.minLength(6)]],
      name:["",[Validators.required,  Validators.minLength(3), Validators.pattern('[a-zA-Z ]*') ]],
      identifier:["",[Validators.required, this.validIdentifier ]],
      address: ["",[Validators.required, Validators.minLength(6)]],
      birthDate: ["", Validators.required],
      
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
          "type":"Seller"
      }

    this.http.post(url,bodyData).subscribe(
      res=>{
        this.toast.success("Cadastro efetuado com sucesso!");
        this.route.navigate(['editSeller'])
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
