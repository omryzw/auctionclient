import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any = localStorage.getItem('username');
  allNotifications: any = [];
  totalNotifications = 0;
  lastCount = 0;
  fullName = localStorage.getItem('name');
  allBidsWon: any =[]

  constructor(private data: DataService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getBidsWon();
    this.initializeNotificationCount();
    setInterval(() => {
      this.getAllUserNotifications();
    }, 5000);
  }

  initializeNotificationCount() {
    if (this.user != null) {
      this.data.getAllUserNotifications(this.user).subscribe(
        (res: any) => {
          this.lastCount = res.total;
        },
        (err) => {
          alert('Notification Services Down');
        }
      );
    }
  }

  getAllUserNotifications(): void {
    if (this.user != null) {
      this.data.getAllUserNotifications(this.user).subscribe(
        (res: any) => {
          this.allNotifications = res.content;
          this.totalNotifications = res.total;
          if (this.totalNotifications > this.lastCount) {
            this.showNotification(res.total);
          }
        },
        (err) => {
          alert('Notification Services Down');
        }
      );
    }
  }

  getBidsWon(): void {
    this.data.getBidsWon(this.user).subscribe(
      (res: any) => {
        this.allBidsWon = res.content;
      },
      (err) => {
        alert('Data Fetch Error: Bids');
      }
    );
  }



  showNotification(count: any) {
    this.lastCount = count;
    this.toastr.info('Bid Notification', 'You have a new notification');
  }

  logout(): void {
    localStorage.clear();
  }
}
