import type { VehicleType } from '../../enums/vehicles/vehicle-type.enum';
import type { IRemoteStreamContent } from '../../volo/abp/content/models';
import type { Status } from '../../enums/common/status.enum';
import type { CreationAuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateVehicleDto {
  vehicleType: VehicleType;
  image: IRemoteStreamContent;
  vehiclePlate?: string;
  vehicleModel?: string;
  roadTaxExpiryDate?: string;
  serviceDate?: string;
  status: Status;
  remark?: string;
}

export interface UpdateVehicleDto {
  vehicleType: VehicleType;
  image: IRemoteStreamContent;
  vehiclePlate?: string;
  vehicleModel?: string;
  roadTaxExpiryDate?: string;
  serviceDate?: string;
  status: Status;
  remark?: string;
}

export interface VehicleDto extends CreationAuditedEntityDto<string> {
  vehicleType: VehicleType;
  imageFileName?: string;
  imageContent: number[];
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
