import { Injectable } from '@angular/core';
import { TripInterface } from '../../models/TripInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = "http://localhost:3000/trips";

  constructor(private http: HttpClient) {}

  getTrips() {
    return this.http.get<TripInterface[]>(this.apiUrl);
  }
}
