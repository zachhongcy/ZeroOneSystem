import { ToasterService } from '@abp/ng.theme.shared';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { statusOptions } from '@proxy/enums/common';
import { uomOptions } from '@proxy/enums/products';
import { ProductGroupLookupDto } from '@proxy/product-groups/dto';
import { ProductService } from '@proxy/products';
import { ProductDto } from '@proxy/products/dto';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { ProductTransactionColumns } from 'src/app/shared/models/column';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})
export class EditProductComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toasterService = inject(ToasterService);

  id: string;
  imageUrl: string | ArrayBuffer | null = null;
  errorMessages: string;
  productForm: FormGroup;
  image: File;
  statuses = statusOptions;
  uoms = uomOptions;
  productGroups$: Observable<ProductGroupLookupDto[]>;
  columns = ProductTransactionColumns;

  private buildForm(product: ProductDto): void {
    this.productForm = this.fb.group({
      code: [product.code, Validators.required],
      imageName: [''],
      imageContent: [''],
      nameEn: [product.nameEn, Validators.required],
      nameCn: [product.nameCn, Validators.required],
      productGroupId: [product.productGroupId, Validators.required],
      uom: [product.uom, Validators.required],
      quantityPa: [product.quantityPa, Validators.required],
      quantityPr: [product.quantityPr, Validators.required],
      quantityRn: [product.quantityRn, Validators.required],
      quantityRu: [product.quantityRu, Validators.required],
      status: [product.status, Validators.required],
      location: [product.location, Validators.required],
      owner: [product.owner, Validators.required],
      productSize: this.fb.group({
        type: [product.productSize.type, Validators.required],
        height: [product.productSize.height, Validators.required],
        length: [product.productSize.length, Validators.required],
        width: [product.productSize.width, Validators.required],
        thickness: [product.productSize.thickness, Validators.required],
        remark: [product.productSize.remark],
      }),
      productPrice: this.fb.group({
        standardPurchaseCost: [product.productPrice.standardPurchaseCost, Validators.required],
        minPurchaseCost: [product.productPrice.minPurchaseCost, Validators.required],
        maxPurchaseCost: [product.productPrice.maxPurchaseCost, Validators.required],
        standardSellingPrice: [product.productPrice.standardSellingPrice, Validators.required],
        sellingPrice2: [product.productPrice.sellingPrice2],
        sellingPrice3: [product.productPrice.sellingPrice3],
        minSellingPrice: [product.productPrice.minSellingPrice, Validators.required],
        maxSellingPrice: [product.productPrice.maxSellingPrice, Validators.required],
        standardRentalPrice: [product.productPrice.standardRentalPrice, Validators.required],
        rentalPrice2: [product.productPrice.rentalPrice2],
        rentalPrice3: [product.productPrice.rentalPrice3],
        minRentalPrice: [product.productPrice.minRentalPrice, Validators.required],
        maxRentalPrice: [product.productPrice.maxRentalPrice, Validators.required],
      })
    });    
  }

  constructor() {
    this.productGroups$ = this.productService.getProductGroupLookup().pipe(map((r) => r.items));
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.productService.get(id)),
        tap(product => {
          this.buildForm(product);
          this.setImageUrl(product.id)
        })
      )
      .subscribe();
  }

  private setImageUrl(id: string): void {
    this.productService.getImageContent(id).subscribe((imageContent) => {
      this.imageUrl = 'data:image/png;base64,' + imageContent;
    });
  }
  
  save(): void {
    if (this.productForm.invalid) {
      const invalidInputs = this.getInvalidInputs(this.productForm).join(', ');
      this.errorMessages = `The following are required: ${invalidInputs}`;
      return;
    }

    this.errorMessages = '';

    this.productService.update(this.id, this.productForm.value).subscribe(() => {
      this.toasterService.success('::Product:EditSuccess');
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
