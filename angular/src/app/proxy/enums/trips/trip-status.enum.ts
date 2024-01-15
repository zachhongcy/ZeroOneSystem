import { mapEnumToOptions } from '@abp/ng.core';

export enum TripStatus {
  Pending = 0,
  Scheduled = 1,
  InProgress = 2,
  Delayed = 3,
  Completed = 4,
}

export const tripStatusOptions = mapEnumToOptions(TripStatus);
