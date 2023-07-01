import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-alterar-product',
  templateUrl: './alterar-product.component.html',
  styleUrls: ['./alterar-product.component.scss']
})
export class AlterarProductComponent  implements OnInit{

   public formProduct: FormGroup
   


  /*activatedRoute permite que consigamos acessar
  uma URL e extrair informações dela
  */
  constructor(private router:Router,private fb:FormBuilder,private toastr:ToastrService,private productService:ProductService,private activatedRoute: ActivatedRoute){

    this.formProduct = this.buildFormProduct()
  }
   
  private buildFormProduct():FormGroup{
      return this.fb.group({
        id:[null, Validators.required],
        name:[null,[Validators.required, Validators.minLength(3) ]],
        category:[null,[Validators.required,  ]],
        value:[null,[Validators.required, Validators.pattern(/^\d{1,5}\.\d{2}$/)  ]],
        description:[null,[Validators.required, Validators.minLength(10) ]],
        imageLink:[null,[Validators.required,  ]],

      })
  }


  ngOnInit(): void {
    
    // usado para capturar o valor do parâmetro 'id' da rota atualmente ativa
      const productID = String(this.activatedRoute.snapshot.paramMap.get('id'))
      
      this.productService.listById(productID).subscribe(
        res=>{
          // preencher os dados do formulário com a resposta recebida:
          this.formProduct.patchValue(res)
        },
        err =>{
          this.toastr.error(err)
        }
      )
    }
/**
 
   public updateProduct(){
      // Os dados do produto a serem salvos
      const product:Product = this.formProduct.value as Product

      this.productService.update(product).subscribe(
        res =>(
          this.formProduct.reset()
          this.toastr.success(`Produto ${product.description} atualizado!`)
           this.router.navigate(['editProduct'])
          ),
         err =>(
          this.toastr.error(`Falha ao atualizar produto`)
         ) 
      )
    }
 */
  
}
