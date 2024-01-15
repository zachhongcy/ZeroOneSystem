import { Rest, RestService } from '@abp/ng.core';
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
  private readonly restService = inject(RestService);
  private readonly productService = inject(ProductService);
  private readonly toasterService = inject(ToasterService);

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

  private buildForm(): void {
    this.basicDetailsForm = this.fb.group({
      code: ['', Validators.required],
      image: [null],
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
    });

    this.sizeDetailsForm = this.fb.group({
      type: [''],
      height: [0, Validators.required],
      length: [0, Validators.required],
      width: [0, Validators.required],
      thickness: [0, Validators.required],
      remark: [''],
    });

    this.priceDetailsForm = this.fb.group({
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
    });
  }

  constructor() {
    this.productGroups$ = this.productService.getProductGroupLookup().pipe(map((r) => r.items));
    this.buildForm();
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

    this.createProduct(formData).subscribe(() => {
      this.toasterService.success('::Product:CreateSuccess');
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

  private createProduct = (formData: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/product',
      body: formData,
    },
    { apiName: 'Default',...config });
}
