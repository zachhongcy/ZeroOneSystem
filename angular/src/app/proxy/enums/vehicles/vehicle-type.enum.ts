import { mapEnumToOptions } from '@abp/ng.core';

export enum VehicleType {
  Light = 0,
  Medium = 1,
  Heavyduty = 2,
}

export const vehicleTypeOptions = mapEnumToOptions(VehicleType);
