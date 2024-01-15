import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductGroupComponent } from './edit-product-group.component';

describe('EditProductGroupComponent', () => {
  let component: EditProductGroupComponent;
  let fixture: ComponentFixture<EditProductGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
