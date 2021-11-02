import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss'],
})
export class ProductSingleComponent implements OnInit {
  productDetails: any;
  productId: string = '';
  currentBid: any = {
    user: localStorage.getItem('username'),
    amount: 0,
  }

  showAutoBidSuccess: boolean = false;

  showBidForm: boolean = false;

  constructor(private data: DataService, private spinner: NgxSpinnerService,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params.id;
      this.getSingleProduct(params.id);
    });
  }

  getSingleProduct(id: string):void {
    this.spinner.show();
    this.data.getSingleProduct(id).subscribe(
      (res: any) => {
        this.productDetails = res.content;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        alert('Data Fetch Error, Reload');
      }
    );
  }

  placeBid():void {
    this.spinner.show();
    this.data.placeBid(this.productId, this.currentBid).subscribe(
      (res: any) => {
        this.getSingleProduct(this.productId);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err.error.message);
        alert('Data Fetch Error, Reload');
      }
    );
  }

  activateAutoBid($event:any) {
    if($event.target.checked) {
      this.data.placeAutoBid(this.productId, {user : this.currentBid.user}).subscribe(
        (res: any) => {
          this.getSingleProduct(this.productId);
          this.showAutoBidSuccess = true;
        }
        ,
        (err) => {
          this.showAutoBidSuccess = false;
          alert('Data Fetch Error, Reload');
        }
      );
  } else {
      // send stop autobid request
  }
  }
}
