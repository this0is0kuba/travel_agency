import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripInfoService {

  numberOfAddedTrips: number = 0;
  numbersOfAllAddedTrips: {[id: string]: number} = {};

  private subject = new BehaviorSubject(0);

  constructor() {}

  incrementCounter(id: string){
    this.numberOfAddedTrips ++;
    this.subject.next(this.numberOfAddedTrips);

    if(this.numbersOfAllAddedTrips[id] == undefined)
      this.numbersOfAllAddedTrips[id] = 1;
    else
      this.numbersOfAllAddedTrips[id] ++;
  }

  decrementCounter(id: string) {
    this.numberOfAddedTrips --;
    this.subject.next(this.numberOfAddedTrips);

    this.numbersOfAllAddedTrips[id] --;
  }

  getNumberOfAddedTrips() {
    return this.subject;
  }

  getPurchasedNumber(id: string) {

    if(this.numbersOfAllAddedTrips[id] == undefined)
      return 0;

    return this.numbersOfAllAddedTrips[id];
  }
}
