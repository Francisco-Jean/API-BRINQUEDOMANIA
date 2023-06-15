import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin:FormGroup;
  
  constructor( private fb:FormBuilder,private loginService:LoginService,private route:Router, private toast: ToastrService) {
    this.formLogin = this.criaFormLogin();
   }

  ngOnInit(): void {
  }
 
  public criaFormLogin():FormGroup{
    return this.fb.group({
      username:["",[Validators.required, Validators.minLength(6)]],
      password:["",[Validators.required, Validators.minLength(6)]],
    })
  }


  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched )
  }

  public submitForm(){
    const {username, password} = this.formLogin.value;
    this.formLogin.reset();

    this.loginService.login(username, password).subscribe(
      res =>{
         this.toast.success("Login efetuado com sucesso!");
         this.route.navigate(['']);
      },
      err =>(
        this.toast.error(err)
      )
    )
  }
}
