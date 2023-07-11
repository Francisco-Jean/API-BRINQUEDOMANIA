import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVendedorComponent } from './cadastrar-vendedor.component';

describe('CadastrarVendedorComponent', () => {
  let component: CadastrarVendedorComponent;
  let fixture: ComponentFixture<CadastrarVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarVendedorComponent]
    });
    fixture = TestBed.createComponent(CadastrarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
