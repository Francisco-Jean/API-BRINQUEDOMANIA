
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
//import { LoginService } from 'LoginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name:any;
  constructor(private loginService:LoginService,private route:Router) {

  this.name = this.loginService.getName();

 }
  ngOnInit(): void {
  }

}
