import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sale } from '../../shared-venda/sale.model';
import { SellerService } from '../../shared-vendedor/seller.service';
import { LoginService } from 'src/app/components/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from '../../shared-venda/sale.service';
declare var bootstrap:any;

@Component({
  selector: 'app-lista-vendas-vendedor',
  templateUrl: './lista-vendas-vendedor.component.html',
  styleUrls: ['./lista-vendas-vendedor.component.scss']
})
export class ListaVendasVendedorComponent implements OnInit{

  public listSale:Array<Sale>= []
  public id: string |null

  constructor(private sellerService: SellerService, private loginService: LoginService, private toastr: ToastrService, private saleService: SaleService ){
    const {name, type, id} = this.loginService.getData();
    this.id = id
  }

  ngOnInit(): void {
  }
  
}
