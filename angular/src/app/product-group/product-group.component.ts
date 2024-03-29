import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ProductGroupDto } from '@proxy/product-groups/dto';
import { ProductGroupService } from '@proxy/product-groups';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';
import { productGroupColumns } from '../shared/models/column';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrl: './product-group.component.scss',
  providers: [ListService],
})
export class ProductGroupComponent implements OnInit {
  productGroups = { items: [], totalCount: 0 } as PagedResultDto<ProductGroupDto>;
  isColumnVisibilityModalOpen = false;

  columns = productGroupColumns;

  constructor(
    public readonly list: ListService, 
    private productGroupService: ProductGroupService,
    private confirmation: ConfirmationService,
    private datePipe: DatePipe,
    private toasterService: ToasterService) {}

  ngOnInit(): void {
    const streamCreator = (query: PagedAndSortedResultRequestDto) => this.productGroupService.getList(query);
    
    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.productGroups = response;
    });
  }

  delete(id: string): void {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.productGroupService.delete(id).subscribe(() => {
          this.toasterService.success('::ProductGroup:DeleteSuccess');
          this.list.get();
        });
      }
    });
  }

  export(): void {
    this.productGroupService.export().subscribe((file: Blob) => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = 'ProductGroupsExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::ProductGroup:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }
}
