import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComprasComponent } from './components/carrinho-compras/carrinho-compras.component';
import { SellerComponent } from './private/seller/seller.component';
import { AutorizadoGuard } from './_guard/autorizado.guard';
//import { authguardGuard } from './auth/authguard.guard';

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
  path: 'seller',
  component: SellerComponent,
  canActivate:[AutorizadoGuard]
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
