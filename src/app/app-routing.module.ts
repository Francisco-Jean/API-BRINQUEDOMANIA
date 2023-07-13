import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComprasComponent } from './components/carrinho-compras/carrinho-compras.component';
import { SellerComponent } from './private/seller/seller.component';
import { AutorizadoGuard } from './_guard/autorizado.guard';
import { EditProductComponent } from './private/edit-product/edit-product.component';
import { AlterarProductComponent } from './private/alterar-product/alterar-product.component';
import { CadastrarVendedorComponent } from './private/gerente/cadastrar-vendedor/cadastrar-vendedor.component';
import { VisualizarVendedorComponent } from './private/gerente/visualizar-vendedor/visualizar-vendedor.component';
import { DetalhesProdutoComponent } from './components/detalhes-produto/detalhes-produto.component';
import { ListarVendasDataComponent } from './private/vendas/listar-vendas-data/listar-vendas-data.component';
import { ListaVendasVendedorComponent } from './private/vendas/lista-vendas-vendedor/lista-vendas-vendedor.component';
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
  path: 'editProduct',
  component: EditProductComponent,
  canActivate:[AutorizadoGuard]
 },

 {
  path: 'alteraProduct/:id',
  component: AlterarProductComponent,
  canActivate:[AutorizadoGuard]
 },

 {
  path: 'cadastrarVendedor',
  component: CadastrarVendedorComponent,
  canActivate:[AutorizadoGuard]
 },

 {
  path: 'visualizarVendedor',
  component:VisualizarVendedorComponent ,
  canActivate:[AutorizadoGuard]
 },

 {
  path: 'visualizarVendas',
  component:ListarVendasDataComponent ,
  canActivate:[AutorizadoGuard]
 },
 
 {
  path: 'detalhes/:productId',
  component: DetalhesProdutoComponent
 },
 
 {
  path: 'visualizarVendasVendedor',
  component: ListaVendasVendedorComponent

 },

{
  path:'**', redirectTo:'home'
}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AutorizadoGuard],
})
export class AppRoutingModule { }
