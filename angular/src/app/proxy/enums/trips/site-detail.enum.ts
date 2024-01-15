import { mapEnumToOptions } from '@abp/ng.core';

export enum SiteDetail {
  Block = 0,
  Lot = 1,
  Company = 2,
}

export const siteDetailOptions = mapEnumToOptions(SiteDetail);
