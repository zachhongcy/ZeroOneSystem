import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdjustmentComponent } from './product-adjustment.component';
import { CreateProductAdjustmentComponent } from './create-product-adjustment/create-product-adjustment.component';
import { EditProductAdjustmentComponent } from './edit-product-adjustment/edit-product-adjustment.component';

const routes: Routes = [
  { path: '', component: ProductAdjustmentComponent },
  { path: 'create', component: CreateProductAdjustmentComponent },
  { path: 'edit/:id', component: EditProductAdjustmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAdjustmentRoutingModule { }
