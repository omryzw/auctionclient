import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user : any = localStorage.getItem('username');
  allNotifications: any = [];
  totalNotifications = 0;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.getAllUserNotifications();
    }
    , 5000);
  }

  getAllUserNotifications():void {
    if(this.user != null){
    this.data.getAllUserNotifications(this.user).subscribe(
      (res:any) => {
        this.allNotifications = res.content;
        this.totalNotifications = res.total;
        console.log(this.allNotifications);
      },
      err => {
        alert('Notification Services Down')
      }
    )
  }
  }



}
