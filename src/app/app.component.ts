
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angulartitle';

  // Removed for brevity

  constructor(private router: Router,private titleService: Title,private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if(child) {
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
        }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
}