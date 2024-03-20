import { Component, Input } from '@angular/core';
import { CellTemplate } from '../../enums/cell-template.enum';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Rest } from '@abp/ng.core';
import { ProductService } from '@proxy/products';
import { DriverService } from '@proxy/drivers';
import { VehicleService } from '@proxy/vehicles';

@Component({
  selector: 'app-datatable-cell',
  templateUrl: './datatable-cell.component.html',
  styleUrl: './datatable-cell.component.scss'
})
export class DatatableCellComponent {
  @Input() template: CellTemplate;
  @Input() value: any;
  @Input() enumName: string;
  @Input() source: string;
  @Input() id: string;

  cellTemplate = CellTemplate;
  isImageModalOpen = false;
  openedImageSrc: SafeUrl;

  constructor(
    private productService: ProductService,
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {}

  openImage(): void {
    if (!this.id) {
      return;
    }

    this.isImageModalOpen = true;
    switch(this.source) {
      case 'product':
        this.productService.getImageContent(this.id).subscribe(imageContent => {
          this.openedImageSrc = 'data:image/png;base64,' + imageContent;
        });
        break;
      case 'driver':
        this.driverService.getImageContent(this.id).subscribe(imageContent => {
          this.openedImageSrc = 'data:image/png;base64,' + imageContent;
        });
        break;
      case 'vehicle':
        this.vehicleService.getImageContent(this.id).subscribe(imageContent => {
          this.openedImageSrc = 'data:image/png;base64,' + imageContent;
        });
        break;
      default:
        break;
    }
  }

  displayMultiline(text: string): string {
    return text.replace('\r\n', ' <br> ');
  }
}
