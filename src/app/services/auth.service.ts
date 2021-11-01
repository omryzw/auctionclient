import { Injectable } from '@angular/core';
import { Users } from './users';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);

  login = (user: any) => {
    const userFound = Users.find(
      (x: any) => x.email == user.email && x.password == user.password
    );
    console.log(userFound);
    if (userFound) {
      this.loggedIn.next(true);
      localStorage.setItem('username', userFound.username);
      localStorage.setItem('name', userFound.name);
      localStorage.setItem('photoUrl', userFound.photoUrl);
      return true;
    }
    return false;
  };

  isLoggedin(): boolean {
    // check if a username is set in local storage
    if (localStorage.getItem('username')) {
      return true;
    }
    return false;
  }

  constructor() {
    console.log(Users);
  }
}
