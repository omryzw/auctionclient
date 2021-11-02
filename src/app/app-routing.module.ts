import { AutobidComponent } from './pages/bids/autobid/autobid.component';
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
    data: {title: 'Home | All Bid Items'},
    canActivate: [IsloggedGuard],
    canLoad:[IsloggedGuard]

  },
  {
    path: 'product/:id',
    component: ProductSingleComponent,
    data: {title: 'Bid On Product'},
    canActivate: [IsloggedGuard],
    canLoad:[IsloggedGuard]
  },
  {
    path: 'autobid',
    component: AutobidComponent,
    data: {title: 'Configure Autobidding'},
    canActivate: [IsloggedGuard],
    canLoad:[IsloggedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login | Auction Site'},

  },
  {
    path: '**',
    component: NotfoundComponent,
    data: {title: 'Page Not Found'},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
