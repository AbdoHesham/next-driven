import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
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
