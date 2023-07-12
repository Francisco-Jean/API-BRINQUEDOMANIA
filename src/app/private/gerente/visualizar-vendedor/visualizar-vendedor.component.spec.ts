import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarVendedorComponent } from './visualizar-vendedor.component';

describe('VisualizarVendedorComponent', () => {
  let component: VisualizarVendedorComponent;
  let fixture: ComponentFixture<VisualizarVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarVendedorComponent]
    });
    fixture = TestBed.createComponent(VisualizarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
