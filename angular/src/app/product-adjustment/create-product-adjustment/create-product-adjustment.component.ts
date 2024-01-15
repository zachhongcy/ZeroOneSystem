import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { uomOptions } from '@proxy/enums/products';
import { ProductAdjustmentService } from '@proxy/product-adjustments';

@Component({
  selector: 'app-create-product-adjustment',
  templateUrl: './create-product-adjustment.component.html',
  styleUrl: './create-product-adjustment.component.scss',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },]
})
export class CreateProductAdjustmentComponent implements OnInit {
  @ViewChild(MatTable) _matTable:MatTable<any>;
  
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly productAdjustmentService = inject(ProductAdjustmentService);
  private readonly toasterService = inject(ToasterService);

  form: FormGroup;
  uoms = uomOptions;
  documentNo: string;

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

  private buildForm(): void {
    this.form = this.fb.group({
      documentNo: [this.documentNo],
      documentDate: [null, Validators.required],
      description: ['', Validators.required],
      totalCost: [0],
      productAdjustmentItems: this.fb.array([])
    });
  }

  private addProductAdjustmentItems(): void {
    this.productAdjustmentItems.push(this.initItemRow());
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

  private generateDocumentNumber(): void {
    this.productAdjustmentService.generateDocumentNo().subscribe((documentNo) => {
      this.documentNo = documentNo;
      this.form.get('documentNo').setValue(this.documentNo);
    });
  }

  constructor() {
    this.buildForm();
    this.addProductAdjustmentItems();
  }

  ngOnInit(): void {
    this.generateDocumentNumber();
  }

  save(): void {
    console.log(JSON.stringify(this.form.value));

    if (this.form.invalid) {
      return;
    }
    
    this.productAdjustmentService.create(this.form.value).subscribe(() => {
      this.toasterService.success('::ProductAdjustment:CreateSuccess');
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
