import { DatePipe } from '@angular/common';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Helpers {
  public static getLocale(): string {
    if (navigator.languages) {
      return navigator.languages[0];
    }
    else if (navigator.language) {
      return navigator.language;
    }
    else {
      return 'en-US';
    }
  }

  public static validateStringIsNotEmpty(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value && control.value.toString().trim().length > 0 ? null : {emptyString: {value: control.value}};
    };
  }

  public static validateDate(control: AbstractControl): boolean | null {
    const  v = control.value;
    if (v) {
      return v.year && v.month && v.day ? null : false;
    }
    return null;
  }

  public static convertDateToNgbDate(dateObj: Date): {year: number, month: number, day: number} {
    if (dateObj != null) {
      const localeString: string = Helpers.getLocale();
      return {
        year: Number(new DatePipe(localeString).transform(dateObj, 'yyyy')),
        month: Number(new DatePipe(localeString).transform(dateObj, 'MM')),
        day: Number(new DatePipe(localeString).transform(dateObj, 'dd'))
      };
    }
    return null;
  }

  public static convertNgbDateToDate(dateObj: NgbDateStruct) {
    if (dateObj) {
      // the beauty of zero-indexed months
      return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    }
    return null;
  }
}
