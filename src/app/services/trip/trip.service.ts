import { Injectable } from '@angular/core';
import { TripInterface } from '../../models/TripInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { newTripInterface } from '../../models/newTripInterface';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = "http://localhost:3000/trips";

  constructor(private http: HttpClient) {}

  getTrips() {
    return this.http.get<TripInterface[]>(this.apiUrl);
  }

  getTrip(id: string) {

    const url = this.apiUrl + "/" + id;

    return this.http.get<TripInterface>(url);
  }

  deleteTrip(id: string) {

    const url = this.apiUrl + "/" + id;

    return this.http.delete(url);
  }

  addTrip(trip: newTripInterface) {

    const url = this.apiUrl;

    const formData = new FormData();
    
    formData.append("name", trip.name);
    formData.append("targetCountry", trip.targetCountry);
    formData.append("startDate", trip.startDate);
    formData.append("endDate", trip.endDate);
    formData.append("price", trip.price.toString());
    formData.append("amountOfFreePlaces", trip.amountOfFreePlaces.toString());
    formData.append("description", trip.description);

    formData.append("mainImg", trip.mainImg!);
    
    if(trip.allMiniImg != undefined) {

      for(let i = 0; i < trip.allMiniImg!.length; i++)
        formData.append(`miniImg-${i}`, trip.allMiniImg[i]);
    }

    if(trip.allLargeImg != undefined) {

      for(let i = 0; i < trip.allLargeImg!.length; i++)
        formData.append(`largeImg-${i}`, trip.allLargeImg[i]);
    }
    
    return this.http.post(url, formData);
  }
}
