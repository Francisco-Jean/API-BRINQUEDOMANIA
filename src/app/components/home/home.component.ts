
import { LoginService } from './../login/login.service';
import {  CadastroComponent } from './../cadastro/cadastro.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('fadeIn',[
      state('void', style({opacity:0})),
      transition(':enter', [
        animate('1s', style({opacity:1}))
      ])
    ]),
  
 
 
        trigger('scale', [
          state('void', style({ transform: 'scale(0)' })),
          transition(':enter', [
            animate('500ms', style({ transform: 'scale(1)' }))
          ])
        ])
      ]
    })

export class HomeComponent implements OnInit {

  name:string | null;
  type:string | null;
  id:string | null;
  constructor(private loginService:LoginService,private route:Router,) {

  const{name, type, id } = this.loginService.getData();
  this.name = name
  this.type = type
  this.id = id
 }
  ngOnInit(): void {
  }

}
