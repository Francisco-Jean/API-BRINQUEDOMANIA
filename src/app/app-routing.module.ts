import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComprasComponent } from './components/carrinho-compras/carrinho-compras.component';

const routes: Routes = [
 {
  path: 'login',
  component: LoginComponent
 },
 {
  path: 'home',
  component: HomeComponent
 },
 {
  path: 'cadastro',
  component: CadastroComponent
 },
 
/*
 {
  path:'', component:LayoutComponent,
  children:[
    {
    path:'', component:HomeComponent
  }
    
  ]

},
*/

// Redirecionar para a home se nenhuma url
// for encontrada
{
  path: 'carrinho',
  component: CarrinhoComprasComponent
 },
{
  path:'**', redirectTo:'home'
}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
