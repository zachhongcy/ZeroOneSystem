import type { CreateTripDto, TripDto, UpdateTripDto } from './dto/models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DriverLookupDto } from '../drivers/dto/models';
import type { VehicleLookupDto } from '../vehicles/dto/models';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  apiName = 'Default';
  

  create = (input: CreateTripDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/trip',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/trip/${id}`,
    },
    { apiName: this.apiName,...config });
  

  export = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'POST',
      responseType: 'blob',
      url: '/api/app/trip/export',
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TripDto>({
      method: 'GET',
      url: `/api/app/trip/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDriverLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<DriverLookupDto>>({
      method: 'GET',
      url: '/api/app/trip/driver-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TripDto>>({
      method: 'GET',
      url: '/api/app/trip',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getTripNo = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/trip/trip-no',
    },
    { apiName: this.apiName,...config });
  

  getVehicleLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ListResultDto<VehicleLookupDto>>({
      method: 'GET',
      url: '/api/app/trip/vehicle-lookup',
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateTripDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/trip/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
