import type { CreateDriverDto, DriverDto, UpdateDriverDto } from './dto/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  apiName = 'Default';
  

  create = (input: CreateDriverDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/driver',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/driver/${id}`,
    },
    { apiName: this.apiName,...config });
  

  export = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'POST',
      responseType: 'blob',
      url: '/api/app/driver/export',
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DriverDto>({
      method: 'GET',
      url: `/api/app/driver/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDriverNo = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/driver/driver-no',
    },
    { apiName: this.apiName,...config });
  

  getImageContent = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: `/api/app/driver/${id}/image-content`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DriverDto>>({
      method: 'GET',
      url: '/api/app/driver',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateDriverDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/driver/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
