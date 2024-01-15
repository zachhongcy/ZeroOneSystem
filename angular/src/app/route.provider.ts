import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/product-groups',
        name: '::Menu:ProductGroups',
        iconClass: 'fas fa-object-group',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/products',
        name: '::Menu:Products',
        iconClass: 'fas fa-cubes',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: '/product-adjustments',
        name: '::Menu:ProductAdjustments',
        iconClass: 'fas fa-balance-scale',
        order: 4,
        layout: eLayoutType.application,
      },
      {
        path: '/trips',
        name: '::Menu:Trips',
        iconClass: 'fas fa-cart-arrow-down',
        order: 5,
        layout: eLayoutType.application,
      },
      {
        path: '/drivers',
        name: '::Menu:Drivers',
        iconClass: 'fas fa-user',
        order: 6,
        layout: eLayoutType.application,
      },
      {
        path: '/vehicles',
        name: '::Menu:Vehicles',
        iconClass: 'fas fa-truck',
        order: 7,
        layout: eLayoutType.application,
      },
    ]);
  };
}
