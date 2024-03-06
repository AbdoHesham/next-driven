import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class POSGuard implements CanActivate {
  canLoad(route: Route): boolean {
    const posLogin = JSON.parse(localStorage.getItem('posLogin') || '{}');
    if (posLogin == true) {
      return true;
    } else {
      this.router.navigate(['sales/pos/auth/login']);
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
    const posLogin = JSON.parse(localStorage.getItem('posLogin') || '{}');
    if (posLogin == true) {
      return true;
    } else {
      this.router.navigate(['sales/pos/auth/login']);
      return false;
    }
  }
}
