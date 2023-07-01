import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarProductComponent } from './alterar-product.component';

describe('AlterarProductComponent', () => {
  let component: AlterarProductComponent;
  let fixture: ComponentFixture<AlterarProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarProductComponent]
    });
    fixture = TestBed.createComponent(AlterarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
