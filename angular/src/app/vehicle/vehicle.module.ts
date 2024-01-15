import { NgModule } from '@angular/core';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatableCellModule } from '../shared/components/datatable-cell/datatable-cell.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VehicleComponent,
    CreateVehicleComponent,
    EditVehicleComponent
  ],
  imports: [
    SharedModule,
    VehicleRoutingModule,
    NgbDatepickerModule,
    DatatableCellModule
  ]
})
export class VehicleModule { }
