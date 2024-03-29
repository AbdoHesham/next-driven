import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e:any) {
      if (e) {
        okCallback();
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.success(message)
  }

  message(message: string) {
    alertify.message(message)
  }
}
