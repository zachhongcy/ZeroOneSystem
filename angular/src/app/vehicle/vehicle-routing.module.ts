import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';

const routes: Routes = [
  { path: '', component: VehicleComponent },
  { path: 'create', component: CreateVehicleComponent },
  { path: 'edit/:id', component: EditVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
