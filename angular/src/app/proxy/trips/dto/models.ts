import type { TripType } from '../../enums/trips/trip-type.enum';
import type { TripStatus } from '../../enums/trips/trip-status.enum';
import type { TripPriority } from '../../enums/trips/trip-priority.enum';
import type { SiteDetail } from '../../enums/trips/site-detail.enum';
import type { CreationAuditedEntityDto } from '@abp/ng.core';

export interface CreateTripDto {
  tripNo?: string;
  tripType: TripType;
  tripDate?: string;
  tripStatus: TripStatus;
  customerName?: string;
  referDocNo: number;
  priority: TripPriority;
  remark?: string;
  siteName?: string;
  siteDetail: SiteDetail;
  siteAddress?: string;
  contactPerson?: string;
  contactNo?: string;
  driverId?: string;
  vehicleId?: string;
}

export interface TripDto extends CreationAuditedEntityDto<string> {
  tripNo?: string;
  tripType: TripType;
  tripDate?: string;
  tripStatus: TripStatus;
  customerName?: string;
  referDocNo: number;
  priority: TripPriority;
  remark?: string;
  siteName?: string;
  siteDetails?: string;
  siteAddress?: string;
  contactPerson?: string;
  contactNo?: string;
  driverId?: string;
  driverName?: string;
  vehicleId?: string;
  vehiclePlate?: string;
}

export interface UpdateTripDto {
  tripNo?: string;
  tripType: TripType;
  tripDate?: string;
  tripStatus: TripStatus;
  customerName?: string;
  referDocNo: number;
  priority: TripPriority;
  remark?: string;
  siteName?: string;
  siteDetail: SiteDetail;
  siteAddress?: string;
  contactPerson?: string;
  contactNo?: string;
  driverId?: string;
  vehicleId?: string;
}
