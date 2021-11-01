import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class IsloggedGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.auth.isLoggedin() === true) {
      return this.route.navigate(['/login'])
    }
    return this.auth.isLoggedin()
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.auth.isLoggedin() === true) {
      return this.route.navigate(['/login'])
    }
    return this.auth.isLoggedin()
  }

  
  
}

