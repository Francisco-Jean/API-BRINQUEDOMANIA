import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller } from 'src/app/private/shared-vendedor/seller.model';
import { Product } from 'src/app/private/shared/product.model';
import { ProductService } from 'src/app/private/shared/product.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {
  productData: any | Product
  sellerData: any | Seller
  constructor(private activeRouter: ActivatedRoute, private product: ProductService){}
  ngOnInit(): void {
      let productId = this.activeRouter.snapshot.paramMap.get('productId');
      console.warn(productId);
      productId && this.product.listById(productId).subscribe((result)=>{
        console.warn(result);
        this.productData=result;
      })
      let sellerId = this.activeRouter.snapshot.paramMap.get('')
      sellerId && this.product.listById(productId).subscribe((result)=>{
        console.warn(result);
        this.productData=result;
      })
  }
}
