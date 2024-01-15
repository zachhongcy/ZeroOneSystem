import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverComponent } from './driver.component';
import { CreateDriverComponent } from './create-driver/create-driver.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';

const routes: Routes = [
  { path: '', component: DriverComponent },
  { path: 'create', component: CreateDriverComponent },
  { path: 'edit/:id', component: EditDriverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
