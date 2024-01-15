import { Component, Input } from '@angular/core';
import { CellTemplate } from './cell-template.enum';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-datatable-cell',
  templateUrl: './datatable-cell.component.html',
  styleUrl: './datatable-cell.component.scss'
})
export class DatatableCellComponent {
  @Input() template: CellTemplate;
  @Input() value: any;
  @Input() enumName: string;

  cellTemplate = CellTemplate;
  isImageModalOpen = false;
  openedImageSrc: SafeUrl;

  openImage(data: string): void {
    this.isImageModalOpen = true;
    this.openedImageSrc = 'data:image/png;base64,' + data;
  }

  displayMultiline(text: string): string {
    return text.replace('\r\n', ' <br> ');
  }
}
