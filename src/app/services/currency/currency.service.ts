import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  private currentCurrencyIndex = 0;
  private currecniesList = ["PLN", "EUR", "USD"];

  private static ConverterFromPLNTo = new Map<string, number>([
      ["PLN", 1],
      ["EUR", 0.2304147],
      ["USD", 0.2531646]
  ])

  getNextCurrency(): string{

      this.currentCurrencyIndex ++;
      let index: number  = this.currentCurrencyIndex % 3;

      return this.currecniesList[index];
  }

  getCurrentCurrency(): string{

      let index: number  = this.currentCurrencyIndex % 3;
      return this.currecniesList[index];
  }

  static convertPLN(value: number, currency: string): number{

      let convertionRate: number | undefined = this.ConverterFromPLNTo.get(currency);

      if(convertionRate != undefined) {
          return convertionRate * value;
      }

      return value;
  }
}
