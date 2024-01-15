import { mapEnumToOptions } from '@abp/ng.core';

export enum TripPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export const tripPriorityOptions = mapEnumToOptions(TripPriority);
