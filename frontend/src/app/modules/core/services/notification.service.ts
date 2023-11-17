import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.autoDismiss = false;
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(title + ': ' + message);
  }

  showInfo(message: string, title: string) {
    this.toastr.info(title + ': ' + message);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(title + ': ' + message);
  }

  showError(message: string, title?: string) {
    // this.toastr.error((title ? title : 'Error') + ': ' + message);
  }
}
