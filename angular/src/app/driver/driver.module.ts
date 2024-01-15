import { NgModule } from '@angular/core';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateDriverComponent } from './create-driver/create-driver.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';
import { DatatableCellModule } from '../shared/components/datatable-cell/datatable-cell.module';


@NgModule({
  declarations: [
    DriverComponent,
    CreateDriverComponent,
    EditDriverComponent
  ],
  imports: [
    SharedModule,
    DriverRoutingModule,
    NgbDatepickerModule,
    DatatableCellModule
  ]
})
export class DriverModule { }
