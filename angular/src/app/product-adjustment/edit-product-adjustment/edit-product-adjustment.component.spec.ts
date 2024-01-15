import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductAdjustmentComponent } from './edit-product-adjustment.component';

describe('EditProductAdjustmentComponent', () => {
  let component: EditProductAdjustmentComponent;
  let fixture: ComponentFixture<EditProductAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductAdjustmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
