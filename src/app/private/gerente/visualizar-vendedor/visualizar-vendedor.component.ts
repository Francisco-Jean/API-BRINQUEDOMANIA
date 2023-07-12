import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SellerService } from '../../shared-vendedor/seller.service';
import { Seller } from '../../shared-vendedor/seller.model';
import { LoginService } from '../../../components/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

declare var bootstrap:any;

@Component({
  selector: 'app-visualizar-vendedor',
  templateUrl: './visualizar-vendedor.component.html',
  styleUrls: ['./visualizar-vendedor.component.scss'],
})

export class VisualizarVendedorComponent implements OnInit, AfterViewInit {
  public listSellers:Array<Seller>= []
  
  public id: string | null;

  constructor(private sellerService: SellerService, private loginService: LoginService, private toastr: ToastrService ){
    const {name, type, id} = this.loginService.getData();
    this.id = id;
  }

  ngOnInit():void{
    
    // Se inscrever no Observable para poder
    // extrair a informação que está vindo
    this.sellerService.listByType().subscribe( 
         res =>{
          this.listSellers = res.filter(() =>
          this.id === this.id
          )
          console.log(this.listSellers)
        }
    )
    
  }

  ngAfterViewInit(): void {
      const tooltip1 = [].slice.call(document.querySelectorAll('#tooltip'));
      tooltip1.map(function(tooltip:any){
        return new bootstrap.Tooltip(tooltip)
      })
  }
  public removerSeller(sellerId:string|undefined){
   
    if(!window.confirm(`Deseja excluir o vendedor : ${sellerId}?`)){
      return
    }
   
    this.sellerService.delete(sellerId).subscribe(
      error => {
        this.toastr.error('Erro ao deletar vendedor.');
      },
      res => {
        this.toastr.success('Vendedor deletado com sucesso!');
        this.listSellers = this.listSellers.filter(e=> e.id !== sellerId)
      }
    );
  }

}
