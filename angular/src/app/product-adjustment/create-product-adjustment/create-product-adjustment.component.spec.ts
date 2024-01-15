import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductAdjustmentComponent } from './create-product-adjustment.component';

describe('CreateProductAdjustmentComponent', () => {
  let component: CreateProductAdjustmentComponent;
  let fixture: ComponentFixture<CreateProductAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductAdjustmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProductAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
