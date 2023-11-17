import { Component, NgZone, OnInit } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[notification-component]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent extends Toast {
  undoString = '';

  constructor(
    toastrService: ToastrService,
    toastPackage: ToastPackage,
    ngZone?: NgZone
  ) {
    super(toastrService, toastPackage, ngZone);
    const type = this.toastPackage.toastType;
    switch (type) {
      case 'toast-success':
        this.toastClasses =
          'alert alert-success alert-dismissible bg-success text-white border-0 fade show ngx-toastr';
        break;
      case 'toast-error':
        this.toastClasses =
          'alert alert-danger alert-dismissible bg-danger text-white border-0 fade show ngx-toastr';
        break;
      case 'toast-warning':
        this.toastClasses =
          'alert alert-warning alert-dismissible bbg-warning fade show ngx-toastr';
        break;
      case 'toast-info':
        this.toastClasses =
          'alert alert-info alert-dismissible bg-info fade show ngx-toastr';
        break;
      default:
        this.toastClasses =
          'alert alert-danger alert-dismissible bg-danger text-white border-0 fade show ngx-toastr';
    }
  }

  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
