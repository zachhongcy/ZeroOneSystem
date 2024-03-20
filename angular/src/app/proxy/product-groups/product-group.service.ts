import type { CreateProductGroupDto, ProductGroupDto, UpdateProductGroupDto } from './dto/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GetProductGroupsDto } from '../product-adjustments/dto/models';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupService {
  apiName = 'Default';
  

  create = (input: CreateProductGroupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/product-group',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/product-group/${id}`,
    },
    { apiName: this.apiName,...config });
  

  export = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'POST',
      responseType: 'blob',
      url: '/api/app/product-group/export',
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductGroupDto>({
      method: 'GET',
      url: `/api/app/product-group/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetProductGroupsDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductGroupDto>>({
      method: 'GET',
      url: '/api/app/product-group',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateProductGroupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/product-group/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
