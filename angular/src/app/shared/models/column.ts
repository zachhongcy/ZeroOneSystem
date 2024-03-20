import { CellTemplate } from "../enums/cell-template.enum";

class Column {
    prop: string;
    name: string;
    visible?: boolean;
    sortable?: boolean;
    template?: CellTemplate;
    enumName?: string;
    source?: string;

    constructor(column: Partial<Column>) {
        this.prop = column.prop;
        this.name = column.name;
        this.visible = column.visible ?? true;
        this.sortable = column.sortable ?? true;
        this.template = column.template;
        this.enumName = column.enumName ?? '';
        this.source = column.source ?? '';
    }
}

export const productGroupColumns: Column[] = [
    new Column({ prop: 'name', name: '::ProductGroup:Name' }),
    new Column({ prop: 'shortCode', name: '::ProductGroup:ShortCode' }),
    new Column({ prop: 'description', name: '::ProductGroup:Description' }),
    new Column({ 
            prop: 'status', 
            name: '::ProductGroup:Status', 
            template: CellTemplate.Enum,
            enumName: '::ProductGroup:EnumStatus.',
        }),
    new Column({ prop: 'isForSales', name: '::ProductGroup:IsForSales', template: CellTemplate.YesNo }),
    new Column({ prop: 'creationTime', name: '::Common:CreationTime', template: CellTemplate.DateTime }),
];

export const productColumns: Column[] = [
    new Column({ 
        prop: 'imageContent', 
        name: '::Product:Picture', 
        template: CellTemplate.Image, 
        source: 'product', 
        sortable: false 
    }),
    new Column({ prop: 'code', name: '::Product:Code' }),
    new Column({ prop: 'nameEn', name: '::Product:NameEn' }),
    new Column({ prop: 'nameCn', name: '::Product:NameCn' }),
    new Column({ prop: 'productGroupCodeName', name: '::Product:ProductGroup', sortable: false }),
    new Column({ prop: 'uom', name: '::Product:Uom', enumName: '::Product:EnumUom.', template: CellTemplate.Enum }),
    new Column({ 
        prop: 'productQuantities', 
        name: '::Product:Quantities', 
        template: CellTemplate.Multiline,
        sortable: false
     }),
    new Column({ prop: 'location', name: '::Product:Location' }),
    new Column({ 
        prop: 'status', 
        name: '::Product:Status', 
        enumName: '::Product:EnumStatus.', 
        template: CellTemplate.Enum 
    }),
    new Column({ prop: 'owner', name: '::Product:Owner' }),
    new Column({ prop: 'creationTime', name: '::Common:CreationTime', template: CellTemplate.DateTime }),
];

export const ProductTransactionColumns: Column[] = [
    new Column({ prop: 'companyName', name: '::Product:CompanyName' }),
    new Column({ prop: 'transactionDate', name: '::Product:TransactionDate' }),
    new Column({ prop: 'unitPrice', name: '::Product:UnitPrice' }),
    new Column({ prop: 'quantity', name: '::Product:Quantity' }),
    new Column({ prop: 'subTotal', name: '::Product:SubTotal' }),
];

export const ProductAdjustmentColumns: Column[] = [
    new Column({ prop: 'documentNo', name: '::ProductAdjustment:DocumentNumber' }),
    new Column({ prop: 'documentDate', name: '::ProductAdjustment:Date', template: CellTemplate.Date }),
    new Column({ prop: 'description', name: '::ProductAdjustment:Description' }),
    new Column({ 
        prop: 'totalCost', 
        name: '::ProductAdjustment:Total', 
        template: CellTemplate.Price,
        sortable: false
    }),
    new Column({ prop: 'creationTime', name: '::Common:CreationTime', template: CellTemplate.DateTime }),
];

export const TripColumns: Column[] = [
    new Column({ prop: 'tripNo', name: '::Trip:Number' }),
    new Column({ prop: 'tripDate', name: '::Trip:Date', template: CellTemplate.Date }),
    new Column({
        prop: 'tripStatus', 
        name: '::Trip:Status', 
        enumName: '::Trip:EnumStatus.',
        template: CellTemplate.Enum 
    }),
    new Column({
        prop: 'tripType', 
        name: '::Trip:Type', 
        enumName: '::Trip:EnumType.',
        template: CellTemplate.Enum 
    }),
    new Column({ prop: 'customerName', name: '::Trip:CustomerName' }),
    new Column({ prop: 'referDocNo', name: '::Trip:ReferDocNo' }),
    new Column({ 
        prop: 'priority', 
        name: '::Trip:Priority', 
        enumName: '::Trip:EnumPriority.',
        template: CellTemplate.Enum 
      }),
    new Column({ 
        prop: 'siteDetails', 
        name: '::Trip:SiteDetails', 
        template: CellTemplate.Multiline, 
        sortable: false
     }),
    new Column({ prop: 'driverName', name: '::Trip:Driver', sortable: false }),
    new Column({ prop: 'vehiclePlate', name: '::Trip:Vehicle', sortable: false }),
    new Column({ prop: 'remark', name: '::Trip:Remark' }),
    new Column({ prop: 'creationTime', name: '::Common:CreationTime', template: CellTemplate.DateTime })
];

export const DriverColumns: Column[] = [
    new Column({ 
        prop: 'imageContent', 
        name: '::Driver:Picture', 
        template: CellTemplate.Image, 
        source: 'driver',
        sortable: false
    }),
    new Column({ prop: 'driverNo', name: '::Driver:Number' }),
    new Column({ prop: 'driverName', name: '::Driver:Name' }),
    new Column({ prop: 'licenseNo', name: '::Driver:LicenseNo' }),
    new Column({ prop: 'licenseExpiryDate', name: '::Driver:LicenseExpiryDate', template: CellTemplate.Date }),
    new Column({ prop: 'contactNo', name: '::Driver:ContactNo' }),
    new Column({ prop: 'employeeCategory', name: '::Driver:EmployeeCategory' }),
    new Column({ 
        prop: 'status', 
        name: '::Driver:Status', 
        enumName: '::Driver:EnumStatus.', 
        template: CellTemplate.Enum, 
    }),
    new Column({ prop: 'creationTime', name: '::Common:CreationTime', template: CellTemplate.DateTime, })
];

export const VehicleColumns: Column[] = [
    new Column({ 
        prop: 'imageContent', 
        name: '::Vehicle:Picture', 
        template: CellTemplate.Image, 
        source: 'vehicle',
        sortable: false
    }),
    new Column({ prop: 'vehiclePlate', name: '::Vehicle:Plate' }),
    new Column({ prop: 'vehicleModel', name: '::Vehicle:Model' }),
    new Column({ 
        prop: 'vehicleType', 
        name: '::Vehicle:Type', 
        enumName: '::Vehicle:EnumType.',
        template: CellTemplate.Enum 
    }),
    new Column({ prop: 'roadTaxExpiryDate', name: '::Vehicle:RoadTaxExpiryDate', template: CellTemplate.Date }),
    new Column({ prop: 'serviceDate', name: '::Vehicle:ServiceDate', template: CellTemplate.Date }),
    new Column({ 
        prop: 'status', 
        name: '::Vehicle:Status', 
        enumName: '::Vehicle:EnumStatus.', 
        template: CellTemplate.Enum, 
    }),
    new Column({ prop: 'creationTime', name: '::Common:CreationTime', template: CellTemplate.DateTime })
];