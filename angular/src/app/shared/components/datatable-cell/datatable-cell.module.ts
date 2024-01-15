import { NgModule } from '@angular/core';
import { DatatableCellComponent } from './datatable-cell.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    DatatableCellComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DatatableCellComponent
  ]
})
export class DatatableCellModule { }
