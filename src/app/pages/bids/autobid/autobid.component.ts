import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-autobid',
  templateUrl: './autobid.component.html',
  styleUrls: ['./autobid.component.scss'],
})
export class AutobidComponent implements OnInit {
  config: any = {
    user: localStorage.getItem('username'),
    maxAmount: 0,
    alertTrigger: 0,
  };
  isSetup: boolean = false;

  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  setupAutoBid(): void {
    this.spinner.show();
    this.data.setupAutoBid(this.config).subscribe(
      (res: any) => {
        this.isSetup = true;
        this.spinner.hide();
        this.config.maxAmount = 0;
        this.config.alertTrigger = 0;
      },
      (err: any) => {
        this.spinner.hide();
        alert('Data Fetch Error');
      }
    );
  }

  validateIfNumber(): Boolean {
    console.log(isNaN(this.config.maxAmount))
    return isNaN(this.config.maxAmount)
  }
}
