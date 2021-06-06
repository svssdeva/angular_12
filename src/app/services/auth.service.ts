import { Injectable } from '@angular/core';
import {AuthDataModal, UserDataModal} from "../auth/auth-user.modal";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  authChange = new Subject<boolean>();
  constructor(private router: Router) {
    this.user = null;
  }

  registerUser(authData: AuthDataModal) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }
  login(authData: AuthDataModal) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
   this.authSuccessfully();
  }
  logout() {
    this.user = null;
    this.authFailure();
  }
  getUser() {
    return {...this.user};
  }
  isAuth() {
    return this.user != null;
  }
  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate([`/training`]);
  }
  authFailure() {
    this.authChange.next(false);
    this.router.navigate([`/login`]);
  }
}
