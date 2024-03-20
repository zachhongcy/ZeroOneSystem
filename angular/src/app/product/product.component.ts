import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from '@proxy/products/dto';
import { ProductService } from '@proxy/products';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { productColumns } from '../shared/models/column';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ListService],
})
export class ProductComponent implements OnInit {
  products = { items: [], totalCount: 0 } as PagedResultDto<ProductDto>;
  isColumnVisibilityModalOpen = false;

  columns = productColumns;

  constructor(
    public readonly list: ListService, 
    private productService: ProductService,
    private confirmation: ConfirmationService,
    private datePipe: DatePipe,
    private toasterService: ToasterService) {}

  ngOnInit(): void {
    const streamCreator = (query: PagedAndSortedResultRequestDto) => this.productService.getList(query);

    this.list.hookToQuery(streamCreator).subscribe((response) => {
      this.products = response;
    });
  }

  delete(id: string): void {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.productService.delete(id).subscribe(() => {
          this.toasterService.success('::Product:DeleteSuccess');
          this.list.get()
        });
      }
    });
  }

  export(): void {
    this.productService.export().subscribe((file: Blob) => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = 'ProductsExport_' + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss') + '.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
      this.toasterService.success('::Product:ExportSuccess');
    });
  }

  setColumnsVisibility(): void {
    this.isColumnVisibilityModalOpen = true;
  }

  getImageContent(id: string): Observable<string> {
    console.log(id);
    return this.productService.getImageContent(id);
  }
}
