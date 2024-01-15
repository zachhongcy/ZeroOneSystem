import { Rest, RestService } from '@abp/ng.core';
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
  private readonly restService = inject(RestService);
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toasterService = inject(ToasterService);

  id: string;
  basicDetailsForm: FormGroup;
  sizeDetailsForm: FormGroup;
  priceDetailsForm: FormGroup;
  image: File;
  statuses = statusOptions;
  uoms = uomOptions;
  productGroups$: Observable<ProductGroupLookupDto[]>;

  columns = [
    { prop: 'companyName', name: '::Product:CompanyName', visible: true },
    { prop: 'transactionDate', name: '::Product:TransactionDate', visible: true },
    { prop: 'unitPrice', name: '::Product:UnitPrice', visible: true },
    { prop: 'quantity', name: '::Product:Quantity', visible: true },
    { prop: 'subTotal', name: '::Product:SubTotal', visible: true },
  ];

  private buildForm(product: ProductDto): void {
    this.basicDetailsForm = this.fb.group({
      code: [product.code, Validators.required],
      image: [null],
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
    });

    this.sizeDetailsForm = this.fb.group({
      type: [product.productSize.type, Validators.required],
      height: [product.productSize.height, Validators.required],
      length: [product.productSize.length, Validators.required],
      width: [product.productSize.width, Validators.required],
      thickness: [product.productSize.thickness, Validators.required],
      remark: [product.productSize.remark],
    });

    this.priceDetailsForm = this.fb.group({
      standardPurchaseCost: [product.productPrice.standardPurchaseCost, Validators.required],
      minPurchaseCost: [product.productPrice.minPurchaseCost, Validators.required],
      maxPurchaseCost: [product.productPrice.standardSellingPrice, Validators.required],
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
    });
  }

  constructor() {
    this.productGroups$ = this.productService.getProductGroupLookup().pipe(map((r) => r.items));
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.productService.get(id)),
        tap(driver => this.buildForm(driver))
      )
      .subscribe();
  }
  
  save(): void {
    const formData = new FormData();

    if (this.basicDetailsForm.invalid || this.sizeDetailsForm.invalid || this.priceDetailsForm.invalid) {
      return;
    }

    formData.append('code', this.basicDetailsForm.value.code);
    formData.append('image', this.image);
    formData.append('nameEn', this.basicDetailsForm.value.nameEn);
    formData.append('nameCn', this.basicDetailsForm.value.nameCn);
    formData.append('productGroupId', this.basicDetailsForm.value.productGroupId);
    formData.append('uom', this.basicDetailsForm.value.uom);
    formData.append('quantityPa', this.basicDetailsForm.value.quantityPa);
    formData.append('quantityPr', this.basicDetailsForm.value.quantityPr);
    formData.append('quantityRu', this.basicDetailsForm.value.quantityRu);
    formData.append('quantityRn', this.basicDetailsForm.value.quantityRn);
    formData.append('status', this.basicDetailsForm.value.status);
    formData.append('location', this.basicDetailsForm.value.location);
    formData.append('owner', this.basicDetailsForm.value.owner);

    formData.append('ProductSize.type', this.sizeDetailsForm.value.type);
    formData.append('ProductSize.height', this.sizeDetailsForm.value.height);
    formData.append('ProductSize.length', this.sizeDetailsForm.value.length);
    formData.append('ProductSize.width', this.sizeDetailsForm.value.width);
    formData.append('ProductSize.thickness', this.sizeDetailsForm.value.thickness);
    formData.append('ProductSize.remark', this.sizeDetailsForm.value.remark);

    formData.append('ProductPrice.standardPurchaseCost', this.priceDetailsForm.value.standardPurchaseCost);
    formData.append('ProductPrice.minPurchaseCost', this.priceDetailsForm.value.minPurchaseCost);
    formData.append('ProductPrice.maxPurchaseCost', this.priceDetailsForm.value.maxPurchaseCost);
    formData.append('ProductPrice.standardSellingPrice', this.priceDetailsForm.value.standardSellingPrice);
    formData.append('ProductPrice.sellingPrice2', this.priceDetailsForm.value.sellingPrice2);
    formData.append('ProductPrice.sellingPrice3', this.priceDetailsForm.value.sellingPrice3);
    formData.append('ProductPrice.minSellingPrice', this.priceDetailsForm.value.minSellingPrice);
    formData.append('ProductPrice.maxSellingPrice', this.priceDetailsForm.value.maxSellingPrice);
    formData.append('ProductPrice.standardRentalPrice', this.priceDetailsForm.value.standardRentalPrice);
    formData.append('ProductPrice.rentalPrice2', this.priceDetailsForm.value.rentalPrice2);
    formData.append('ProductPrice.rentalPrice3', this.priceDetailsForm.value.rentalPrice3);
    formData.append('ProductPrice.minRentalPrice', this.priceDetailsForm.value.minRentalPrice);
    formData.append('ProductPrice.maxRentalPrice', this.priceDetailsForm.value.maxRentalPrice);

    this.updateProduct(formData).subscribe(() => {
      this.toasterService.success('::Product:EditSuccess');
      this.router.navigate(['/products']);
    });
  }

  addImageToForm(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files.length <= 0) {
      return;
    }
    
    this.image = files[0];
  }

  private updateProduct = (formData: FormData, config?: Partial<Rest.Config>) => 
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/product/${this.id}`,
      body: formData,
    },
    { apiName: 'Default',...config });
}
