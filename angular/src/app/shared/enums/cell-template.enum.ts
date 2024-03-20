import { mapEnumToOptions } from '@abp/ng.core';

export enum CellTemplate {
  Enum,
  YesNo,
  DateTime,
  Date,
  Image,
  Price,
  Editable,
  Multiline,
}

export const cellTemplateOptions = mapEnumToOptions(CellTemplate);