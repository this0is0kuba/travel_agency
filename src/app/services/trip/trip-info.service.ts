import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripInfoService {

  numberOfAddedTrips: number = 0;
  private subject = new BehaviorSubject(0);

  constructor() {}

  incrementCounter(){
    this.numberOfAddedTrips ++;
    this.subject.next(this.numberOfAddedTrips);
  }

  decrementCounter() {
    this.numberOfAddedTrips --;
    this.subject.next(this.numberOfAddedTrips);
  }

  getNumberOfAddedTrips() {
    return this.subject;
  }
}
