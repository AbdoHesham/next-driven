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
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({ providedIn: 'root' })
export class LogicalGuard implements CanActivate, CanLoad {
  canLoad(route: Route): boolean {
    const changePassword = this.SharedService.getProp;
    if (changePassword == false) {
      return true;
    } else {
      // this.router.navigate(['/auth/login']);

      return false;
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private SharedService: SharedService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const changePassword = JSON.parse(
      localStorage.getItem('changePassword') || '{}'
    );
    if (!changePassword ) {
      return true;
    } else {
      // this.router.navigate(['/auth/login']);

      return false;
    }
  }
}
