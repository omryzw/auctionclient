import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  allProducts : any= [];

  constructor(private data : DataService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.spinner.show();
    this.data.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.content;
        this.spinner.hide();
      }
  ,(error) => {
    alert('Data Fetch Error')
    this.spinner.hide();
  }) }

  }
