
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('fadeIn',[
      state('void', style({opacity:0})),
      transition(':enter', [
        animate('1s', style({opacity:1}))
      ])
    ]),]
})
export class LoginComponent implements OnInit {

  public formLogin:FormGroup;
  
 public tipo:string|null 

  constructor( private fb:FormBuilder,private loginService:LoginService,private route:Router, private toast: ToastrService) {
    this.formLogin = this.criaFormLogin();
    const{ name,type,id} =  this.loginService.getData()
    this.tipo = type
  }

  ngOnInit(): void {
  }
 
  public criaFormLogin():FormGroup{
    return this.fb.group({
      email:["",[Validators.required, Validators.minLength(6)]],
      password:["",[Validators.required, Validators.minLength(6)]],
    })
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched )
  }

  public submitForm(){
    const {email, password} = this.formLogin.value;
    this.formLogin.reset();

    this.loginService.login(email, password).subscribe(
      res =>{
         this.toast.success("Login efetuado com sucesso!");
      
      this.route.navigate(['home']);                
      },
      err =>(
        this.toast.error(err)
      )
    )
  }
}
