
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { type } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name:string | null;
  type:string | null;
  id:string | null;
  constructor(private loginService:LoginService,private route:Router) {

  const{name, type, id } = this.loginService.getData();
  this.name = name
  this.type = type
  this.id = id
 }
  ngOnInit(): void {
  }

}
