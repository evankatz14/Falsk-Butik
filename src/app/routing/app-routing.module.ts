import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { CartComponent } from '../cart/cart.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    // loadComponent: () => import('../login/login.component').then(({ LoginComponent }) => LoginComponent),
  },
  {
    canActivate: [AuthGuard],
    path: 'products',
    component: ProductsListComponent,
    // loadComponent: () => import('../products-list/products-list.component').then(({ ProductsListComponent }) => ProductsListComponent),
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    // loadComponent: () => import('../product-details/product-details.component').then(({ ProductDetailsComponent }) => ProductDetailsComponent),
  },
  {
    canActivate: [AuthGuard],
    path: 'cart',
    component: CartComponent,
    // loadComponent: () => import('../cart/cart.component').then(({ CartComponent }) => CartComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
