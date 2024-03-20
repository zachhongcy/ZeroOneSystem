import { ToasterService } from '@abp/ng.theme.shared';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { statusOptions } from '@proxy/enums/common';
import { uomOptions } from '@proxy/enums/products';
import { ProductGroupLookupDto } from '@proxy/product-groups/dto';
import { ProductService } from '@proxy/products';
import { Observable, map } from 'rxjs';
import { ProductTransactionColumns } from 'src/app/shared/models/column';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})
export class CreateProductComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly toasterService = inject(ToasterService);

  imageUrl: string | ArrayBuffer | null = null;
  errorMessages: string;
  productForm : FormGroup;
  image: File;
  statuses = statusOptions;
  uoms = uomOptions;
  productGroups$: Observable<ProductGroupLookupDto[]>;
  columns = ProductTransactionColumns;

  private buildForm(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      imageName: [''],
      imageContent: [''],
      nameEn: ['', Validators.required],
      nameCn: ['', Validators.required],
      productGroupId: [null, Validators.required],
      uom: [null, Validators.required],
      quantityPa: [0, Validators.required],
      quantityPr: [0, Validators.required],
      quantityRn: [0, Validators.required],
      quantityRu: [0, Validators.required],
      status: [null, Validators.required],
      location: ['', Validators.required],
      owner: ['', Validators.required],
      productSize: this.fb.group({
        type: ['', Validators.required],
        height: [0, Validators.required],
        length: [0, Validators.required],
        width: [0, Validators.required],
        thickness: [0, Validators.required],
        remark: [''],
      }),
      productPrice: this.fb.group({
        standardPurchaseCost: [0, Validators.required],
        minPurchaseCost: [0, Validators.required],
        maxPurchaseCost: [0, Validators.required],
        standardSellingPrice: [0, Validators.required],
        sellingPrice2: [0],
        sellingPrice3: [0],
        minSellingPrice: [0, Validators.required],
        maxSellingPrice: [0, Validators.required],
        standardRentalPrice: [0, Validators.required],
        rentalPrice2: [0],
        rentalPrice3: [0],
        minRentalPrice: [0, Validators.required],
        maxRentalPrice: [0, Validators.required],
      })
    });
  }

  constructor() {
    this.productGroups$ = this.productService.getProductGroupLookup().pipe(map((r) => r.items));
    this.buildForm();
  }
  
  save(): void {
    if (this.productForm.invalid) {
      const invalidInputs = this.getInvalidInputs(this.productForm).join(', ');
      this.errorMessages = `The following are required: ${invalidInputs}`;
      return;
    }

    this.errorMessages = '';

    this.productService.create(this.productForm.value).subscribe(() => {
      this.toasterService.success('::Product:CreateSuccess');
      this.router.navigate(['/products']);
    });
  }

  addImageToForm(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files.length <= 0) {
      return;
    }
    
    const image = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.productForm.get('imageName').setValue(image.name);
      const imageUrlString = reader.result as string;
      console.log(imageUrlString);
      this.productForm.get('imageContent').setValue(imageUrlString.split(',')[1]);
    }
    reader.readAsDataURL(image);
  }

  private getInvalidInputs(formGroup: FormGroup): string[] {
    const errorKeys: string[] = [];

    Object.keys(formGroup.controls).forEach(key => {    
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        const nestedErrors = this.getInvalidInputs(control);
        if (nestedErrors.length > 0) {
          errorKeys.push(...nestedErrors);
        }
      }
  
      if (control.errors !== null) {
        errorKeys.push(key);
      }
    });

    return errorKeys;
  }
}
