import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public isActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) {}

  changeIsActive(flag: boolean) {
    this.isActive.next(flag);
  }
}
