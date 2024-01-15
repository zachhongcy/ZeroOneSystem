import { NgModule } from '@angular/core';

import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatableCellModule } from '../shared/components/datatable-cell/datatable-cell.module';


@NgModule({
  declarations: [
    TripComponent,
    CreateTripComponent,
    EditTripComponent
  ],
  imports: [
    SharedModule,
    TripRoutingModule,
    NgbDatepickerModule,
    DatatableCellModule
  ]
})
export class TripModule { }
