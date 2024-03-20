import { authGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
    canActivate: [authGuard]
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
    canActivate: [authGuard]
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
    canActivate: [authGuard]
  },
  { 
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [authGuard]
  },
  { 
    path: 'product-groups', 
    loadChildren: () => 
      import('./product-group/product-group.module').then(m => m.ProductGroupModule),
    canActivate: [authGuard] },
  { 
    path: 'trips', 
    loadChildren: () => import('./trip/trip.module').then(m => m.TripModule),
    canActivate: [authGuard]
  },
  { 
    path: 'vehicles', 
    loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
    canActivate: [authGuard]
  },
  { 
    path: 'drivers', 
    loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule),
    canActivate: [authGuard]
  },
  { 
    path: 'product-adjustments', 
    loadChildren: () => 
      import('./product-adjustment/product-adjustment.module').then(m => m.ProductAdjustmentModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
