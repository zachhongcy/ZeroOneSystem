import { mapEnumToOptions } from '@abp/ng.core';

export enum Uom {
  PCS = 0,
}

export const uomOptions = mapEnumToOptions(Uom);
