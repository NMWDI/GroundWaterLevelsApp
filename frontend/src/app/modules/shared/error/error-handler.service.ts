
import { Injectable, ErrorHandler, Injector, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggingService } from 'src/app/modules/shared/services/logger.service';
import { NotificationService } from '../../core/services/notification.service';

@Injectable()  
export class GlobalErrorHandler implements ErrorHandler {
  
    constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse | string) {
    const log = this.injector.get(LoggingService);
    const notification = this.injector.get(NotificationService);

    if (typeof error == 'string') {
      notification.showError(error);
      log.error(error);
      return;
    }

    // Error is instanceof Error or HttpErrorResponse
    if (isDevMode) {
      notification.showError(error.message);
      log.error(error);
    } else {
      notification.showError(this.getUserFriendlyMessage(error));
      log.error(error);
    }
  }

  // Cut down on the details in the toast when we're not in dev mode
  getUserFriendlyMessage(error: Error | HttpErrorResponse): string {
    if (error instanceof HttpErrorResponse) {
      return error.status + " (" + error.statusText + "). See console for details.";
    } else {
      // instanceof Error
      return error.message ? error.message : error.toString();
    }
  }
}

export const errorHandlerProviders = [
  { provide: ErrorHandler, useClass: GlobalErrorHandler },
];