import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { UserDetailsDto } from '../Models/Security/User';
import { HttpService } from './http.service';
import { login } from '../Models/auth/login';
import { changePass } from '../Models/auth/change-pass';
import { OTPNumber } from '../Models/auth/OTP';
import { License_key } from '../Models/auth/LicenseKey';
import { AccountController } from '../APIs/authController';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any;

  // logged in user
  public loggedInUser$: BehaviorSubject<UserDetailsDto> =
    new BehaviorSubject<UserDetailsDto>(new UserDetailsDto());

  // loadingAction
  public loadingAction$: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(false);

  constructor(private router: Router, private HttpService: HttpService) {
    this.user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    if (this.user != null) {
      this.loggedInUser$.next(this.user);
      this.loadingAction$.next(false);
    }
  }

  // store user data after login succeffully
  updateStoredUserInfo(userData: any) {
    let user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    user.firstName = userData && userData.firstName ? userData.firstName : null;
    user.lastName = userData && userData.lastName ? userData.lastName : null;
    user.phoneNumber =
      userData && userData.phoneNumber ? userData.phoneNumber : null;
    if (userData.personalImagePath) {
      user.personalImagePath = userData.personalImagePath;
    }
    localStorage.setItem('nextdriven_user', JSON.stringify(user));

    this.loggedInUser$.next(user);
  }

  updateStoredUserRoles(roles: string[]) {
    let user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    user.userRoles = roles;
    localStorage.setItem('nextdriven_user', JSON.stringify(user));
    this.loggedInUser$.next(user);
  }

  refreshToken(token: string) {
    let user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    user.token = 'Bearer ' + token;
    localStorage.setItem('nextdriven_user', JSON.stringify(user));
    this.loggedInUser$.next(user);
  }

  // store user data after login succeffully
  storeUserDate(user: any) {
    // local storage store only string, so need to convert json data to string
    // JSON.parse(user), to return user to an normal object
    user.is_token_expired = false;
    user.token = 'Bearer ' + user.token;
    localStorage.setItem('nextdriven_user', JSON.stringify(user));

    this.loggedInUser$.next(
      JSON.parse(localStorage.getItem('nextdriven_user') || '{}')
    );
  }

  // load the data
  loadToken() {
    if (
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('nextdriven_user') || '{}').token
    ) {
      this.user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    }
  }

  // check the role
  // roleMatch(allowedRoles: string[]): boolean {

  //   if(!localStorage.getItem('nextdriven_user')) {
  //     this.router.navigate(['/auth/login']);
  //     return false;
  //   }

  //   let isMatch = false;
  //   let userRoles: string[] = JSON.parse(localStorage.getItem('nextdriven_user') || '{}').userRoles;
  //   allowedRoles.forEach(elem => {
  //     if(userRoles.indexOf(elem) > -1) {
  //       isMatch = true;
  //       return false;
  //     }
  //   });

  //   return isMatch;

  // }

  // loading action
  ActionLoading(val: boolean) {
    this.loadingAction$.next(Boolean(val));
  }

  Login(model: login) {
    return this.HttpService.POST(AccountController.Login, model);
  }
  ChangePassword(model: changePass) {
    return this.HttpService.POST(AccountController.ChangePassword, model);
  }

  VerifyOTP(model: OTPNumber) {
    return this.HttpService.POST(AccountController.VerifyOTPNumber, model);
  }

  ConfirmLicenseKey(model: License_key) {
    return this.HttpService.POST(AccountController.ConfirmLicenseKey, model);
  }
  VerifyPINCode(model: any) {
    return this.HttpService.POST(AccountController.VerifyPINCode, model);
  }

  // logout
  logout() {
    this.user = null;
    // localStorage.clear();
    localStorage.removeItem('nextdriven_user');
    localStorage.removeItem('locationDto');
    localStorage.removeItem('Role');
    localStorage.removeItem('email');
    localStorage.removeItem('isFirstLogin');
    localStorage.removeItem('changePassword');
    this.router.navigate(['/auth/login']);
  }
}
