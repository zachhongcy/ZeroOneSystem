import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { SharedModule } from '../shared/shared.module';
import { DatatableCellModule } from '../shared/components/datatable-cell/datatable-cell.module';


@NgModule({
  declarations: [
    ProductComponent,
    CreateProductComponent,
    EditProductComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
    DatatableCellModule
  ]
})
export class ProductModule { }
