import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: any = [];
  allProductsTemp: any = [];
  allCategories: any = []

  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.spinner.show();
    this.data.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.content;
        this.allProductsTemp = JSON.parse(JSON.stringify(data.content));  // deep copy

        this.allCategories = this.allProductsTemp.map((product: any) => {
          return product.category;
        });
        this.allCategories = [...new Set(this.allCategories)];
        this.spinner.hide();
      },
      (error) => {
        alert('Data Fetch Error');
        this.spinner.hide();
      }
    );
  }

  orderProductsByFilter(filter: any): void {
    this.allProductsTemp.length = 0;
    this.allProductsTemp = JSON.parse(JSON.stringify(this.allProducts));
    // this function can reside in the backend if you want
    if(filter){
      filter = filter.value
    }
    if (filter === 'asc') {
      this.allProductsTemp.sort((a: any, b: any) => {
        return a.currentBid.amount - b.currentBid.amount;
      });
    } else if (filter === 'desc') {
      this.allProductsTemp.sort((a: any, b: any) => {
        return b.currentBid.amount - a.currentBid.amount;
      });
    } else if (filter === 'name') {
      this.allProductsTemp.sort((a: any, b: any) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }
  }

  orferProductsByCategory(category: any): void {    this.allProductsTemp.length = 0;
    this.allProductsTemp = JSON.parse(JSON.stringify(this.allProducts));
    if(category){
      category = category.value
    }
    if (category === 'all') {
      this.getAllProducts();
    } else {
      this.allProductsTemp = this.allProductsTemp.filter((product: any) => {
        return product.category === category;
      });
    }
  }
}
