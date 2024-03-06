import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  CanLoad,
  Route,
} from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  canLoad(route: Route): boolean {


    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    if (user && user.accessToken) {
      console.log('authorized');

      return true;
    } else {
      this.router.navigate(['auth/login']);
      console.log('un authorized');

      return false;
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionsService: NgxPermissionsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {


    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    if (user && user.accessToken) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
