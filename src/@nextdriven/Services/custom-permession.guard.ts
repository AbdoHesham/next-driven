import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgxPermissionsGuard, NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPermessionGuard implements CanActivate {
  constructor(
    private ngxPermissions: NgxPermissionsGuard,
    private permissionsService: NgxPermissionsService,

    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const Roles = JSON.parse(localStorage.getItem('Role') || '[]');
    const arr = this.permissionsService.loadPermissions(Roles);
    if (Roles.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
