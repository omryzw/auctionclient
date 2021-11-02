import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  maxSeconds: number = 0;

  showAutoBidSuccess: boolean = false;
  showAutoBidFail: boolean = false;

  showBidForm: boolean = false;

  constructor(private data: DataService, private spinner: NgxSpinnerService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params.id;
      this.getSingleProduct(params.id);
    });
  }

  // calculate seconds left given end date , hours , minutes and seconds
  calculateSecondsLeft(endDate: string): number {
    const endDateTime = new Date(endDate);
    const currentDateTime = new Date();
    const diff = endDateTime.getTime() - currentDateTime.getTime();
    const secondsLeft = Math.floor(diff / 1000);
    return secondsLeft;
  }


  getSingleProduct(id: string):void {
    this.maxSeconds = 0
    this.spinner.show();
    this.data.getSingleProduct(id).subscribe(
      (res: any) => {
        this.productDetails = res.content;
        this.maxSeconds = this.calculateSecondsLeft(this.productDetails.endDate);
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

  changeProductStatus():void {
    this.spinner.show();
    this.data.changeProductStatus(this.productId).subscribe(
      (res: any) => {
        this.spinner.hide();
        alert('Bidding for product has ended');
        this.router.navigate(['/']);
      },
      (err) => {
        this.spinner.hide();
        alert('Data Fetch Error, Reload');
      }
    );
  }

  activateAutoBid($event:any) {
    if($event.target.checked) {
      this.data.placeAutoBid(this.productId, {user : this.currentBid.user}).subscribe(
        (res: any) => {
          this.getSingleProduct(this.productId);
          if(res.status === 'success') {
            this.showAutoBidSuccess = true;
          } else{
            this.showAutoBidFail = true;
          }
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
