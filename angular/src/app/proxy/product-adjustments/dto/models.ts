import type { CreationAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { Uom } from '../../enums/products/uom.enum';

export interface CreateProductAdjustmentDto {
  documentNo?: string;
  documentDate?: string;
  description?: string;
  totalCost: number;
  productAdjustmentItems: ProductAdjustmentItemDto[];
}

export interface ProductAdjustmentDto extends CreationAuditedEntityDto<string> {
  documentNo?: string;
  documentDate?: string;
  description?: string;
  totalCost: number;
  productAdjustmentItems: ProductAdjustmentItemDto[];
}

export interface ProductAdjustmentItemDto {
  itemCode?: string;
  description?: string;
  uom: Uom;
  quantity: number;
  subTotal: number;
  unitCost: number;
}

export interface UpdateProductAdjustmentDto {
  documentNo?: string;
  documentDate?: string;
  description?: string;
  totalCost: number;
  productAdjustmentItems: ProductAdjustmentItemDto[];
}

export interface GetProductGroupsDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
