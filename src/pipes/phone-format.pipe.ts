import { Pipe, PipeTransform } from '@angular/core';
import { PhoneFormat } from '../enums/PhoneFormat';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

   transform(value: string, format: PhoneFormat = PhoneFormat.INTERNATIONAL): string {
    const digits: string = value.replace(/\D/g, '');
    switch (format) {
      case PhoneFormat.COMPACT:
        return `+${digits}`;
      case PhoneFormat.INTERNATIONAL:
        return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
      case PhoneFormat.NATIONAL:
        return `${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
      case PhoneFormat.MASKED:
        return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} *** ** ${digits.slice(10, 12)}`;
      default:
        return value;
    }
  }

}
