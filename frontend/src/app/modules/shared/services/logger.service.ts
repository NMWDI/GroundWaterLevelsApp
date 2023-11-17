import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoggingService {
  log(...args: any): void {
    if (isDevMode()) {
      console.log(...args);
    }
  }

  error(...args: any): void {
    if (isDevMode()) {
      console.error(...args);
    }
  }

  warn(...args: any): void {
    if (isDevMode()) {
      console.warn(...args);
    }
  }
}
