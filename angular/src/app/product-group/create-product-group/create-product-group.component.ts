import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { statusOptions } from '@proxy/enums/common';
import { ProductGroupService } from '@proxy/product-groups';

@Component({
  selector: 'app-create-product-group',
  templateUrl: './create-product-group.component.html',
  styleUrl: './create-product-group.component.scss'
})
export class CreateProductGroupComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly productGroupService = inject(ProductGroupService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  statuses = statusOptions;

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      shortCode: [null, Validators.required],
      description: ['', Validators.required],
      status: [null, Validators.required],
      isForSales: [false, Validators.required]
    });
  }

  constructor() {
    this.buildForm();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.productGroupService.create(this.form.value).subscribe(() => {
      this.toasterService.success('::ProductGroup:CreateSuccess');
      this.router.navigate(['/product-groups']);
    });
  }
}
