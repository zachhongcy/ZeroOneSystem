import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { TripDto } from '@proxy/trips/dto';
import { CellTemplate } from '../shared/components/datatable-cell/cell-template.enum';
import { TripService } from '@proxy/trips';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';

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

  columns = [
    { prop: 'tripNo', name: '::Trip:Number', visible: true },
    { prop: 'tripDate', name: '::Trip:Date', visible: true, template: CellTemplate.Date },
    { 
      prop: 'tripStatus', 
      name: '::Trip:Status', 
      visible: true, 
      enumName: '::Trip:EnumStatus.',
      template: CellTemplate.Enum 
    },
    { 
      prop: 'tripType', 
      name: '::Trip:Type', 
      visible: true, 
      enumName: '::Trip:EnumType.',
      template: CellTemplate.Enum 
    },
    { prop: 'customerName', name: '::Trip:CustomerName', visible: true },
    { prop: 'referDocNo', name: '::Trip:ReferDocNo', visible: true },
    { 
      prop: 'priority', 
      name: '::Trip:Priority', 
      visible: true, 
      enumName: '::Trip:EnumPriority.',
      template: CellTemplate.Enum 
    },
    { prop: 'siteDetails', name: '::Trip:SiteDetails', visible: true, template: CellTemplate.Multiline },
    { prop: 'driverName', name: '::Trip:Driver', visible: true },
    { prop: 'vehiclePlate', name: '::Trip:Vehicle', visible: true },
    { prop: 'remark', name: '::Trip:Remark', visible: true },
    { prop: 'creationTime', name: '::Common:CreationTime', visible: true, template: CellTemplate.DateTime },
  ];

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
      link.download = 'VehiclesExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::Trip:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }
}
