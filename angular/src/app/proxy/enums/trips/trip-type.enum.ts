import { mapEnumToOptions } from '@abp/ng.core';

export enum TripType {
  Delivery = 0,
  Collection = 1,
}

export const tripTypeOptions = mapEnumToOptions(TripType);
