import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComprasComponent } from './components/carrinho-compras/carrinho-compras.component';
import { SellerComponent } from './private/seller/seller.component';
import { EditProductComponent } from './private/edit-product/edit-product.component';
import { AlterarProductComponent } from './private/alterar-product/alterar-product.component';
import { CadastrarVendedorComponent } from './private/gerente/cadastrar-vendedor/cadastrar-vendedor.component';
import { VisualizarVendedorComponent } from './private/gerente/visualizar-vendedor/visualizar-vendedor.component';
import { DetalhesProdutoComponent } from './components/detalhes-produto/detalhes-produto.component';
import { ListarVendasDataComponent } from './private/vendas/listar-vendas-data/listar-vendas-data.component';
import { ListaVendasVendedorComponent } from './private/vendas/lista-vendas-vendedor/lista-vendas-vendedor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    CadastroComponent,
    CarrinhoComprasComponent,
    SellerComponent,
    EditProductComponent,
    AlterarProductComponent,
    CadastrarVendedorComponent,
    VisualizarVendedorComponent,
    DetalhesProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),// ToastrModule added  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
