import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVendasVendedorComponent } from './lista-vendas-vendedor.component';

describe('ListaVendasVendedorComponent', () => {
  let component: ListaVendasVendedorComponent;
  let fixture: ComponentFixture<ListaVendasVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaVendasVendedorComponent]
    });
    fixture = TestBed.createComponent(ListaVendasVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
