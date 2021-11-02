import { NotfoundComponent } from './pages/layouts/notfound/notfound.component';
import { IsloggedGuard } from './guards/islogged.guard';
import { ProductSingleComponent } from './pages/products/product-single/product-single.component';
import { LoginComponent } from './pages/layouts/login/login.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    canActivate: [IsloggedGuard],
    canLoad:[IsloggedGuard]

  },
  {
    path: 'product/:id',
    component: ProductSingleComponent,
    canActivate: [IsloggedGuard],
    canLoad:[IsloggedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
