import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdjustmentComponent } from './product-adjustment.component';

describe('ProductAdjustmentComponent', () => {
  let component: ProductAdjustmentComponent;
  let fixture: ComponentFixture<ProductAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAdjustmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
