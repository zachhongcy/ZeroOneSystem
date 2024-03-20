import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { VehicleDto } from '@proxy/vehicles/dto';
import { CellTemplate } from '../shared/enums/cell-template.enum';
import { VehicleService } from '@proxy/vehicles';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';
import { VehicleColumns } from '../shared/models/column';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  providers: [ListService],
})
export class VehicleComponent implements OnInit {
  vehicles = { items: [], totalCount: 0 } as PagedResultDto<VehicleDto>;
  isColumnVisibilityModalOpen = false;
  columns = VehicleColumns;

  constructor(
    public readonly list: ListService,
    private vehicleService: VehicleService,
    private confirmation: ConfirmationService,
    private datePipe: DatePipe,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    const streamCreator = (query: PagedAndSortedResultRequestDto) => this.vehicleService.getList(query);

    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.vehicles = response;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.vehicleService.delete(id).subscribe(() => {
          this.toasterService.success('::Vehicle:DeleteSuccess');
          this.list.get();
        });
      }
    });
  }

  export() {
    this.vehicleService.export().subscribe((file: Blob) => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = 'VehiclesExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::Vehicle:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }
}
