import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DriverDto } from '@proxy/drivers/dto';
import { CellTemplate } from '../shared/components/datatable-cell/cell-template.enum';
import { DriverService } from '@proxy/drivers';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss',
  providers: [ListService],
})
export class DriverComponent implements OnInit {
  drivers = { items: [], totalCount: 0 } as PagedResultDto<DriverDto>;
  isColumnVisibilityModalOpen = false;

  columns = [
    { prop: 'imageContent', name: '::Driver:Picture', visible: true, template: CellTemplate.Image },
    { prop: 'driverNo', name: '::Driver:Number', visible: true },
    { prop: 'driverName', name: '::Driver:Name', visible: true },
    { prop: 'licenseNo', name: '::Driver:LicenseNo', visible: true },
    { prop: 'licenseExpiryDate', name: '::Driver:LicenseExpiryDate', visible: true, template: CellTemplate.Date },
    { prop: 'contactNo', name: '::Driver:ContactNo', visible: true },
    { prop: 'employeeCategory', name: '::Driver:EmployeeCategory', visible: true },
    { 
      prop: 'status', 
      name: '::Driver:Status', 
      visible: true, 
      enumName: '::Driver:EnumStatus.', 
      template: CellTemplate.Enum, 
    },
    { prop: 'creationTime', name: '::Common:CreationTime', visible: true, template: CellTemplate.DateTime, },
  ];
  

  constructor(
    public readonly list: ListService,
    private driverService: DriverService,
    private confirmation: ConfirmationService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    const streamCreator = (query: PagedAndSortedResultRequestDto) => this.driverService.getList(query);

    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.drivers = response;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.driverService.delete(id).subscribe(() => {
          this.toasterService.success('::Driver:DeleteSuccess');
          this.list.get()
        });
      }
    });
  }

  export() {
    this.driverService.export().subscribe((file: Blob) => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = 'DriversExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::Driver:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }

  getImageSrc(stream): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + stream;

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
