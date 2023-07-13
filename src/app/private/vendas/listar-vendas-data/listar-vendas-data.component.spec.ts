import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendasDataComponent } from './listar-vendas-data.component';

describe('ListarVendasDataComponent', () => {
  let component: ListarVendasDataComponent;
  let fixture: ComponentFixture<ListarVendasDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVendasDataComponent]
    });
    fixture = TestBed.createComponent(ListarVendasDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
