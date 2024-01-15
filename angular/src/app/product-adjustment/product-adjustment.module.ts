import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAdjustmentRoutingModule } from './product-adjustment-routing.module';
import { ProductAdjustmentComponent } from './product-adjustment.component';
import { CreateProductAdjustmentComponent } from './create-product-adjustment/create-product-adjustment.component';
import { EditProductAdjustmentComponent } from './edit-product-adjustment/edit-product-adjustment.component';
import { SharedModule } from '../shared/shared.module';
import { DatatableCellModule } from '../shared/components/datatable-cell/datatable-cell.module';


@NgModule({
  declarations: [
    ProductAdjustmentComponent,
    CreateProductAdjustmentComponent,
    EditProductAdjustmentComponent
  ],
  imports: [
    SharedModule,
    ProductAdjustmentRoutingModule,
    NgbDatepickerModule,
    DatatableCellModule
  ]
})
export class ProductAdjustmentModule { }
