import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  pure: true,
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, many: string, few: string, one: string): string {
    const lastTwo: number = value % 100;
    const last: number = value % 10;
    let count: string = many;
    if (lastTwo >= 11 && lastTwo <= 14) {
      count = many;
    } else if (last === 1) {
      count = one;
    } else if (last >= 2 && last <= 4) {
      count = few;
    } else {
      count = many;
    }
    return `${ value } ${ count }`;
  }

}
