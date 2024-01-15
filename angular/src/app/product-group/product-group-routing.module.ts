import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductGroupComponent } from './product-group.component';
import { CreateProductGroupComponent } from './create-product-group/create-product-group.component';
import { EditProductGroupComponent } from './edit-product-group/edit-product-group.component';

const routes: Routes = [
  { path: '', component: ProductGroupComponent },
  { path: 'create', component: CreateProductGroupComponent },
  { path: 'edit/:id', component: EditProductGroupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductGroupRoutingModule { }
