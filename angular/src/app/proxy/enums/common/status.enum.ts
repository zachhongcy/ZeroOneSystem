import { mapEnumToOptions } from '@abp/ng.core';

export enum Status {
  Inactive = 0,
  Active = 1,
}

export const statusOptions = mapEnumToOptions(Status);
