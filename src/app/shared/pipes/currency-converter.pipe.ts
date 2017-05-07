import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  transform(number: number, type: string): any {
    switch (type) {
      case 'USD':
        break;
      case 'EUR':
        number = number * (0.91);
        break;
      case 'GBP':
        number = number * (.77);
        break;
      case 'JPY':
        number = number * (112.73)
        break;
    }
    return number;;
  }

}
