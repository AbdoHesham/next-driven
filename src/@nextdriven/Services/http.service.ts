import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
// services
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { QueryParamsDto, ResponseDto } from '../Models/Common/response';
import { UserDetailsDto } from '../Models/Security/User';



@Injectable({providedIn:'root'})
export class HttpService {
  user: any;

  constructor(
    private router: Router,
    // private authService: AuthService,
    private http: HttpClient
  ) {
    this.user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    if( this.user != null) {
      this.loggedInUser$.next(this.user);
      this.loadingAction$.next(false);
    }
   }


  setTokenExpiriation(isExpire: boolean) {
    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    user.is_token_expired = isExpire;
    localStorage.setItem('nextdriven_user', JSON.stringify(user));
    this.router.navigate(['/auth/lock-screen']);
  }
  prepareRequestHeaders2(containFiles: boolean = false, isExternal: boolean = false) {
    let headers: HttpHeaders = new HttpHeaders();

    if (!isExternal) {

      if (containFiles) {
        headers = headers.append('Accept', 'application/json');
      } else {
        headers = headers.append('Content-Type', 'application/json');
      }

    }

    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');

    if (user && user.accessToken && !isExternal) {
      headers = headers.append('Authorization', 'bearer '+ user.accessToken);
      headers = headers.append('Accept-Language', localStorage.getItem('currentLang')|| '{}');
    }

    return headers;
  }

  prepareRequestHeaders(containFiles: boolean = false) {
    let headers: HttpHeaders = new HttpHeaders();

    if (containFiles) {
      headers.append('Accept', 'application/json');
    } else {
      headers.append('Content-Type', 'application/json');
    }

    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    if (user && user.accessToken) {
      headers.append('Authorization', 'bearer '+ user.accessToken);
      headers = headers.append('Accept-Language', localStorage.getItem('currentLang')|| '{}');
      console.log(user.token)
    }

    return headers;
  }


  ReturnParameterizedUrl(params: QueryParamsDto[]): HttpParams {

    // params
    let httpParams: HttpParams = new HttpParams();
    if(!params) {
      return httpParams;
    }

    params.forEach(res => {
      if(res.value) {

        if(Array.isArray(res.value)) { // Incase you pass array of Ids 
          let arr = res.value as string[];
          httpParams = httpParams.append(res.key, JSON.stringify(arr.join(',')));
        } else if(typeof res.value == 'object') {
          Object.keys(res.value).forEach(k => {
            httpParams = httpParams.append(k, res.value[k]);
          })
          // url = url + `&&${key}=` + new Date(this.filterDto[key]).toISOString();
        } else {
          httpParams = httpParams.append(res.key, res.value);
        }

      }
    })
    
    return httpParams;

  }

  // GET request
  GET(url: string, params: QueryParamsDto[] = []) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (user && user.accessToken) {
      headers = headers.append('Authorization', 'bearer '+ user.accessToken);
      headers = headers.append('Accept-Language', localStorage.getItem('currentLang')|| '{}');
    }

    return this.http.get(url, { observe: 'response', params: httpParams, headers })
    .pipe(
      catchError(err => {
        if (err.status <= 400 || err.status === 500) {
          const errSTR = JSON.stringify(err);
          const errJSON = JSON.parse(errSTR);
          return throwError(errJSON._body);
        } else if (err.status === 401) { // 401 (not authorized)
          user && user.accessToken ? this.setTokenExpiriation(true) : this.logout();
        } else if (err.status === 403) { // 403 (Forbidden)
          this.router.navigate(['/errors/error-403']);
        }
        return throwError(err.statusText);
      }),
      map(res => res.body as ResponseDto)
    );

  }


  // POST request
  POST(url: string, body: any = null, params: QueryParamsDto[] = [], containFiles: boolean = false) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && user.accessToken) {
      console.log("authorized")
      headers = headers.append('Authorization', 'bearer '+ user.accessToken);
      headers = headers.append('Accept-Language', localStorage.getItem('currentLang')|| '{}');
    }

    return this.http.post(url, body, { observe: 'response', params: httpParams, headers })
    .pipe(
      catchError(err => {
        if (err.status <= 400 || err.status === 500) {
          const errSTR = JSON.stringify(err);
          const errJSON = JSON.parse(errSTR);
          return throwError(errJSON._body);
        } else if (err.status === 401) { // 401 (not authorized)
          user && user.accessToken ? this.setTokenExpiriation(true) : this.logout();
        } else if (err.status === 403) { // 403 (Forbidden)
          this.router.navigate(['/errors/error-403']);
        }
        return throwError(err.statusText);
      }),
      map(res => res.body as ResponseDto)
    );

  }

  // PUT request
  PUT(url: string, body: any = null, params: QueryParamsDto[] = [], containFiles: boolean = false) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    if (user && user.accessToken) {
      headers = headers.append('Authorization','bearer '+ user.accessToken);
      headers = headers.append('Accept-Language', localStorage.getItem('currentLang')|| '{}');
    }

    return this.http.put(url, body, { observe: 'response', params: httpParams, headers })
    .pipe(
      catchError(err => {
        if (err.status <= 400 || err.status === 500) {
          const errSTR = JSON.stringify(err);
          const errJSON = JSON.parse(errSTR);
          return throwError(errJSON._body);
        } else if (err.status === 401) { // 401 (not authorized)
          user && user.accessToken ? this.setTokenExpiriation(true) : this.logout();
        } else if (err.status === 403) { // 403 (Forbidden)
          this.router.navigate(['/errors/error-403']);
        }
        return throwError(err.statusText);
      }),
      map(res => res.body as ResponseDto)
    );

  }


  // DELETE request
  DELETE(url: string, params: QueryParamsDto[] = []) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    if (user && user.accessToken) {
      headers = headers.append('Authorization', 'bearer '+user.accessToken);
      headers = headers.append('Accept-Language', localStorage.getItem('currentLang')|| '{}');
    }

    return this.http.delete(url, { observe: 'response', params: httpParams, headers })
    .pipe(
      catchError(err => {
        if (err.status <= 400 || err.status === 500) {
          const errSTR = JSON.stringify(err);
          const errJSON = JSON.parse(errSTR);
          return throwError(errJSON._body);
        } else if (err.status === 401) { // 401 (not authorized)
          user && user.accessToken ? this.setTokenExpiriation(true) : this.logout();
        } else if (err.status === 403) { // 403 (Forbidden)
          this.router.navigate(['/errors/error-403']);
        }
        return throwError(err.statusText);

      }),
      map(res => res.body as ResponseDto)
    );

  }




  ExportToExcel(url: string) {

    const user = JSON.parse(localStorage.getItem('nextdriven_user') || '{}');

    return this.http.post(url, '', { headers: this.prepareRequestHeaders(), responseType: 'blob' })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            // return _throw(new Error(String(err.status) + ' ' + err.statusText));
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return throwError(errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            user && user.accessToken ? this.setTokenExpiriation(true) : this.logout();
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/demo1/security/forbidden-page']);
          }
          return throwError(err.statusText);
        })
      );
  }
  // logged in user
  public loggedInUser$: BehaviorSubject<UserDetailsDto> = new BehaviorSubject<UserDetailsDto>(new UserDetailsDto());

  // loadingAction
  public loadingAction$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  // logout
  logout() {
    this.user = null;
    // localStorage.clear();
    localStorage.removeItem('nextdriven_user');
    localStorage.removeItem('locationDto');
    localStorage.removeItem('Role');
    this.router.navigate(['/auth/login']);
  }


    

}
