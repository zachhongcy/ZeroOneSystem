import { NgModule } from '@angular/core';

import { ProductGroupRoutingModule } from './product-group-routing.module';
import { ProductGroupComponent } from './product-group.component';
import { CreateProductGroupComponent } from './create-product-group/create-product-group.component';
import { EditProductGroupComponent } from './edit-product-group/edit-product-group.component';
import { SharedModule } from '../shared/shared.module';
import { DatatableCellModule } from '../shared/components/datatable-cell/datatable-cell.module';


@NgModule({
  declarations: [
    ProductGroupComponent,
    CreateProductGroupComponent,
    EditProductGroupComponent
  ],
  imports: [
    SharedModule,
    ProductGroupRoutingModule,
    DatatableCellModule
  ]
})
export class ProductGroupModule { }
