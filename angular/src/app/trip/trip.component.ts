import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { TripDto } from '@proxy/trips/dto';
import { TripService } from '@proxy/trips';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';
import { TripColumns } from '../shared/models/column';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss',
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
})
export class TripComponent implements OnInit {
  trips = { items: [], totalCount: 0 } as PagedResultDto<TripDto>;
  isColumnVisibilityModalOpen = false;
  columns = TripColumns;

  constructor(
    public readonly list: ListService,
    private tripService: TripService,
    private confirmation: ConfirmationService,
    private datePipe: DatePipe,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    const streamCreator = (query: PagedAndSortedResultRequestDto) => this.tripService.getList(query);

    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.trips = response;
      console.log(this.trips);
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.tripService.delete(id).subscribe(() => {
          this.toasterService.success('::Trip:DeleteSuccess');
          this.list.get();
        });
      }
    });
  }

  export() {
    this.tripService.export().subscribe((file: Blob) => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = 'TripsExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::Trip:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }
}
