import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  allProducts : any= [];

  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.data.getAllProducts().subscribe(
      (data: any) => {
        this.allProducts = data.content;
        console.log(this.allProducts);
      }
    );
  }

}
