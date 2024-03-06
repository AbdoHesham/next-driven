import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class FirstLoginGuard implements CanActivate {
  canLoad(route: Route): boolean {
    const isFirstLogin = this.SharedService.getFirstLoginProp;
    if (isFirstLogin) {
      return true;
    } else {
      // this.router.navigate(['/auth/login']);

      return false;
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private SharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params);
    });
    const isFirstLogin = JSON.parse(
      localStorage.getItem('isFirstLogin') || '{}'
    );

    if (isFirstLogin) {
      // if()
      return true;
    } else {
      // this.router.navigate(['/auth/login']);

      return false;
    }
  }
}
