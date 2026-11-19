import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadComponent: () => import("./features/product/pages/product-index/product-index").then(m => m.ProductIndex)
  }
];
