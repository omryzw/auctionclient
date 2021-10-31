import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './pages/layouts/topbar/topbar.component';
import { SidebarComponent } from './pages/layouts/sidebar/sidebar.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductSingleComponent } from './pages/products/product-single/product-single.component';
import { AutobidComponent } from './pages/bids/autobid/autobid.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    ProductListComponent,
    ProductSingleComponent,
    AutobidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
