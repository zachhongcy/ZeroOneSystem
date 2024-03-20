import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ProductAdjustmentDto } from '@proxy/product-adjustments/dto';
import { ProductAdjustmentService } from '@proxy/product-adjustments';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';
import { ProductAdjustmentColumns } from '../shared/models/column';

@Component({
  selector: 'app-product-adjustment',
  templateUrl: './product-adjustment.component.html',
  styleUrl: './product-adjustment.component.scss',
  providers: [ListService],
})
export class ProductAdjustmentComponent implements OnInit {
  productAdjustments = { items: [], totalCount: 0 } as PagedResultDto<ProductAdjustmentDto>;
  isColumnVisibilityModalOpen = false;
  columns = ProductAdjustmentColumns;

  constructor(
    public readonly list: ListService, 
    private productAdjustmentService: ProductAdjustmentService,
    private confirmation: ConfirmationService,
    private datePipe: DatePipe,
    private toasterService: ToasterService) {}

  ngOnInit(): void {
    const streamCreator = (query: PagedAndSortedResultRequestDto) => this.productAdjustmentService.getList(query);

    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.productAdjustments = response;
      console.log(response);
    });
  }

  delete(id: string): void {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.productAdjustmentService.delete(id).subscribe(() => {
          this.toasterService.success('::ProductAdjustment:DeleteSuccess');
          this.list.get();
        });
      }
    });
  }

  export(): void {
    this.productAdjustmentService.export().subscribe((file: Blob) => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = 'ProductAdjustmentsExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::ProductAdjustment:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }
}
