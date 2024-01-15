import { ToasterService } from '@abp/ng.theme.shared';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { statusOptions } from '@proxy/enums/common';
import { ProductGroupService } from '@proxy/product-groups';
import { ProductGroupDto } from '@proxy/product-groups/dto';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-product-group',
  templateUrl: './edit-product-group.component.html',
  styleUrl: './edit-product-group.component.scss'
})
export class EditProductGroupComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly productGroupService = inject(ProductGroupService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toasterService = inject(ToasterService);

  id: string;
  form: FormGroup;
  statuses = statusOptions;

  private buildForm(productGroup: ProductGroupDto): void {
    this.form = this.fb.group({
      name: [productGroup.name, Validators.required],
      shortCode: [productGroup.shortCode, Validators.required],
      description: [productGroup.description, Validators.required],
      status: [productGroup.status, Validators.required],
      isForSales: [productGroup.isForSales, Validators.required]
    });
  }

  constructor() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.productGroupService.get(id)),
        tap(productGroup => this.buildForm(productGroup))
      )
      .subscribe();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.productGroupService.update(this.id, this.form.value).subscribe(() => {
      this.toasterService.success('::ProductGroup:EditSuccess');
      this.router.navigate(['/product-groups']);
    });
  }
}
