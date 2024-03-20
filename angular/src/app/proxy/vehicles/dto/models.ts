import type { VehicleType } from '../../enums/vehicles/vehicle-type.enum';
import type { Status } from '../../enums/common/status.enum';
import type { CreationAuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateVehicleDto {
  vehicleType: VehicleType;
  imageName?: string;
  imageContent?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  roadTaxExpiryDate?: string;
  serviceDate?: string;
  status: Status;
  remark?: string;
}

export interface UpdateVehicleDto {
  vehicleType: VehicleType;
  imageName?: string;
  imageContent?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  roadTaxExpiryDate?: string;
  serviceDate?: string;
  status: Status;
  remark?: string;
}

export interface VehicleDto extends CreationAuditedEntityDto<string> {
  vehicleType: VehicleType;
  vehiclePlate?: string;
  vehicleModel?: string;
  roadTaxExpiryDate?: string;
  serviceDate?: string;
  status: Status;
  remark?: string;
}

export interface VehicleLookupDto extends EntityDto<string> {
  vehiclePlate?: string;
}
