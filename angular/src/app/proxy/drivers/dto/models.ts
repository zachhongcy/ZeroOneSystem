import type { IRemoteStreamContent } from '../../volo/abp/content/models';
import type { Status } from '../../enums/common/status.enum';
import type { CreationAuditedEntityDto, EntityDto } from '@abp/ng.core';

export interface CreateDriverDro {
  driverNo?: string;
  image: IRemoteStreamContent;
  driverName?: string;
  licenseNo?: string;
  licenseExpiryDate?: string;
  contactNo?: string;
  employeeCategory: number;
  password?: string;
  status: Status;
  remark?: string;
  emergencyContactName?: string;
  emergencyRelationship?: string;
  emergencyContactNo?: string;
  address?: string;
}

export interface DriverDto extends CreationAuditedEntityDto<string> {
  driverNo?: string;
  imageId?: string;
  imageFileName?: string;
  imageContent: number[];
  driverName?: string;
  licenseNo?: string;
  licenseExpiryDate?: string;
  contactNo?: string;
  employeeCategory: number;
  password?: string;
  status: Status;
  remark?: string;
  emergencyContactName?: string;
  emergencyRelationship?: string;
  emergencyContactNo?: string;
  address?: string;
}

export interface UpdateDriverDto {
  driverNo?: string;
  image: IRemoteStreamContent;
  driverName?: string;
  licenseNo?: string;
  licenseExpiryDate?: string;
  contactNo?: string;
  employeeCategory: number;
  password?: string;
  status: Status;
  remark?: string;
  emergencyContactName?: string;
  emergencyRelationship?: string;
  emergencyContactNo?: string;
  address?: string;
}

export interface DriverLookupDto extends EntityDto<string> {
  driverName?: string;
}
