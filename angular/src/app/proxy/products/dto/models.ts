import type { Uom } from '../../enums/products/uom.enum';
import type { Status } from '../../enums/common/status.enum';
import type { CreationAuditedEntityDto } from '@abp/ng.core';

export interface CreateProductDto {
  code?: string;
  imageName?: string;
  imageContent?: string;
  nameEn?: string;
  nameCn?: string;
  uom: Uom;
  quantityPr: number;
  quantityPa: number;
  quantityRu: number;
  quantityRn: number;
  location?: string;
  status: Status;
  owner?: string;
  productGroupId?: string;
  productSize: ProductSizeDto;
  productPrice: ProductPriceDto;
}

export interface ProductDto extends CreationAuditedEntityDto<string> {
  code?: string;
  nameEn?: string;
  nameCn?: string;
  productGroupCodeName?: string;
  uom: Uom;
  quantityPr: number;
  quantityPa: number;
  quantityRu: number;
  quantityRn: number;
  productQuantities?: string;
  location?: string;
  status: Status;
  owner?: string;
  productGroupId?: string;
  productSize: ProductSizeDto;
  productPrice: ProductPriceDto;
}

export interface ProductPriceDto {
  standardPurchaseCost: number;
  minPurchaseCost: number;
  maxPurchaseCost: number;
  standardSellingPrice: number;
  sellingPrice2: number;
  sellingPrice3: number;
  minSellingPrice: number;
  maxSellingPrice: number;
  standardRentalPrice: number;
  rentalPrice2: number;
  rentalPrice3: number;
  minRentalPrice: number;
  maxRentalPrice: number;
}

export interface ProductSizeDto {
  type?: string;
  height: number;
  length: number;
  width: number;
  thickness: number;
  remark?: string;
}

export interface UpdateProductDto {
  code?: string;
  imageName?: string;
  imageContent?: string;
  nameEn?: string;
  nameCn?: string;
  uom: Uom;
  quantityPr: number;
  quantityPa: number;
  quantityRu: number;
  quantityRn: number;
  location?: string;
  status: Status;
  owner?: string;
  productGroupId?: string;
  productSize: ProductSizeDto;
  productPrice: ProductPriceDto;
}
