import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: string): string {
    if (value == "Visa" || value == "AmericanExpress" || value == "Discover" || value == "MasterCard"||
      value == "mastercard" || value == "discover" || value == "amex" || value == "visa")
      return value;
    else
      return 'unknown';

  }

}
