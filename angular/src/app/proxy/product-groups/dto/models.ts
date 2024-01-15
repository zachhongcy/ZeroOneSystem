import type { Status } from '../../enums/common/status.enum';
import type { CreationAuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateProductGroupDto {
  name?: string;
  shortCode?: string;
  description?: string;
  status: Status;
  isForSales: boolean;
}

export interface ProductGroupDto extends CreationAuditedEntityDto<string> {
  name?: string;
  shortCode?: string;
  description?: string;
  status: Status;
  isForSales: boolean;
}

export interface UpdateProductGroupDto {
  name?: string;
  shortCode?: string;
  description?: string;
  status: Status;
  isForSales: boolean;
}

export interface ProductGroupLookupDto extends EntityDto<string> {
  shortCode?: string;
  name?: string;
  codeName?: string;
}
