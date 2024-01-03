import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripInfoService {

  numberOfAddedTrips: number = 0;
  numbersOfAllAddedTrips: number[] = Array.from({ length: 1000 }, () => 0);

  private subject = new BehaviorSubject(0);

  constructor() {}

  incrementCounter(id: number){
    this.numberOfAddedTrips ++;
    this.subject.next(this.numberOfAddedTrips);

    this.numbersOfAllAddedTrips[id] ++;
  }

  decrementCounter(id: number) {
    this.numberOfAddedTrips --;
    this.subject.next(this.numberOfAddedTrips);

    this.numbersOfAllAddedTrips[id] --;
  }

  getNumberOfAddedTrips() {
    return this.subject;
  }

  getPurchesedNumber(id: number) {
    return this.numbersOfAllAddedTrips[id];
  }
}
