import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneTransformPipe',
  pure: false
})
export class PhoneTransformPipe implements PipeTransform {

  transform(value: string): string {
    const phoneNumber: string = value.replace(/[^\d]/g, '');
    let transformedNumber: string = '';

    if (phoneNumber.length > 10) {
      return phoneNumber;
    }

    if (phoneNumber.length > 0) {
      transformedNumber = '(' + phoneNumber.substring(0,3);
    }

    if (phoneNumber.length > 3) {
      transformedNumber = transformedNumber + ') ' + phoneNumber.substring(3,6);
    } 

    if (phoneNumber.length > 6) {
      transformedNumber = transformedNumber + '-' + phoneNumber.substring(6,10);
    }

    return transformedNumber;
  }
}
