import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./features/product/pages/product-index/product-index').then((m) => m.ProductIndex),
  },
  {
    path: 'product/create',
    loadComponent: () =>
      import('./features/product/pages/product-create/product-create').then((m) => m.ProductCreate),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
    	import('./features/product/pages/product-details/product-details').then((m) => m.ProductDetails,),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/product/pages/login/login').then((m) => m.Login),
  },
];


