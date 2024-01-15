import { ToasterService } from '@abp/ng.theme.shared';
import { Component, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { uomOptions } from '@proxy/enums/products';
import { ProductAdjustmentService } from '@proxy/product-adjustments';
import { ProductAdjustmentDto } from '@proxy/product-adjustments/dto';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-product-adjustment',
  templateUrl: './edit-product-adjustment.component.html',
  styleUrl: './edit-product-adjustment.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class EditProductAdjustmentComponent {
  @ViewChild(MatTable) _matTable:MatTable<any>;
  
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly productAdjustmentService = inject(ProductAdjustmentService);
  private readonly toasterService = inject(ToasterService);
  private readonly activatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  uoms = uomOptions;
  documentNo: string;
  id: string;

  columns = [
    { prop: 'action', name: '::Action', type: 'action' },
    { prop: 'itemCode', name: '::ProductAdjustmentItem:ItemCode', type: 'text' },
    { prop: 'description', name: '::Common:Description', type: 'text' },
    { prop: 'uom', name: '::ProductAdjustmentItem:Uom', type: 'options' },
    { prop: 'quantity', name: '::ProductAdjustmentItem:Quantity', type: 'number' },
    { prop: 'unitCost', name: '::ProductAdjustmentItem:UnitCost', type: 'number' },
    { prop: 'subTotal', name: '::ProductAdjustmentItem:SubTotal', type: 'label' },
  ];
  displayedColumns: string[] = this.columns.map((column) => column.prop);

  get productAdjustmentItems(): FormArray {
    return this.form.get('productAdjustmentItems') as FormArray;
  }

  private buildForm(productAdjustment: ProductAdjustmentDto): void {
    const itemCount = productAdjustment.productAdjustmentItems.length;

    let currentTotal = 0
    productAdjustment.productAdjustmentItems.forEach(item => {
      currentTotal += item.unitCost * item.quantity;
    });

    this.form = this.fb.group({
      documentNo: [productAdjustment.documentNo],
      documentDate: [new Date(productAdjustment.documentDate), Validators.required],
      description: [productAdjustment.description, Validators.required],
      totalCost: [currentTotal],
      productAdjustmentItems: this.fb.array([...this.createItems(itemCount)])
    });

    this.productAdjustmentItems.setValue(productAdjustment.productAdjustmentItems);
  }

  private createItems(count: number): FormGroup[] {
    const arr = [];
    for (let i = 0; i < count ; i++) {
      arr.push(this.initItemRow());
    }

    return arr;
  }

  private initItemRow(): FormGroup {
    return this.fb.group({
      itemCode: ['', Validators.required],
      description: ['', Validators.required],
      uom: [null, Validators.required],
      quantity: ['', Validators.required],
      unitCost: ['', Validators.required],
      subTotal: [0]
    });
  }

  constructor() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.productAdjustmentService.get(id)),
        tap(productAdjustment => this.buildForm(productAdjustment))
      )
      .subscribe();
  }

  save(): void {
    console.log(JSON.stringify(this.form.value));

    if (this.form.invalid) {
      return;
    }
    
    this.productAdjustmentService.update(this.id, this.form.value).subscribe(() => {
      this.toasterService.success('::ProductAdjustment:EditSuccess');
      this.router.navigate(['/product-adjustments']);
    })
  }

  addItem(): void {
    this.productAdjustmentItems.push(this.initItemRow());
    this._matTable.renderRows();
  }

  removeItem(index: number): void {
    this.productAdjustmentItems.removeAt(index);
    this._matTable.renderRows();
  }
  
  calculateSubTotal(index: number): void {
    const unitCost = Number(this.productAdjustmentItems.controls[index].value.unitCost); 
    const quantity = Number(this.productAdjustmentItems.controls[index].value.quantity);
    const subTotal = unitCost * quantity

    this.productAdjustmentItems.controls[index].patchValue({ subTotal: subTotal });
    
    const currentTotal = this.form.get('totalCost').value;

    this.form.get('totalCost').setValue(currentTotal + subTotal);
  }
}
