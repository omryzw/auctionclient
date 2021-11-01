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

  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.spinner.show();
    this.data.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.content;
        this.spinner.hide();
      },
      (error) => {
        alert('Data Fetch Error');
        this.spinner.hide();
      }
    );
  }

  orderProductsByFilter(filter: any): void {
    // this function can reside in the backend if you want
    if(filter){
      filter = filter.value
    }
    if (filter === 'asc') {
      this.allProducts.sort((a: any, b: any) => {
        return a.currentBid.amount - b.currentBid.amount;
      });
    } else if (filter === 'desc') {
      this.allProducts.sort((a: any, b: any) => {
        return b.currentBid.amount - a.currentBid.amount;
      });
    } else if (filter === 'name') {
      this.allProducts.sort((a: any, b: any) => {
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
}
