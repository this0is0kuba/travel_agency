import { Injectable } from '@angular/core';
import { Filter } from '../../models/Filter';
import { TripInterface } from '../../models/TripInterface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  initialized: boolean = false;

  private filter: Filter = {
    place: [],
    minPrice: 0,
    maxPrice: 100000,
    minStars: 1,
    startDate: null,
    endDate: null
  }

  private edgeValues: Filter = {
    place: [],
    minPrice: 0,
    maxPrice: 0,
    minStars: 1,
    startDate: null,
    endDate: null
  }

  updateFilter(newFilter: Filter) {
    this.filter = newFilter;
  }

  getFilter() {
    return this.filter;
  }

  getEdgeValues() {
    return this.edgeValues;
  }

  setInitial(trips: TripInterface[]) {

    if(this.initialized == true)
      return;


    const place: string[] = [];

    for(let trip of trips) {

      if(!place.includes(trip.targetCountry))
        place.push(trip.targetCountry);
    }


    const minPrice = trips.reduce( (minVal, currTrip) => {
      
      if(currTrip.price < minVal)
        return currTrip.price;
    
      return minVal;

    }, trips[0].price)


    const maxPrice = trips.reduce( (maxVal, currTrip) => {
      
      if(currTrip.price > maxVal)
        return currTrip.price;
    
      return maxVal;

    }, trips[0].price)


    const startDate = trips.reduce( (minStartDate, currTrip) => {
      
      if(currTrip.startDate < minStartDate)
        return currTrip.startDate;
    
      return minStartDate;

    }, trips[0].startDate)


    const endDate = trips.reduce( (maxEndDate, currTrip) => {
      
      if(currTrip.endDate > maxEndDate)
        return currTrip.endDate;
    
      return maxEndDate;

    }, trips[0].endDate)

    this.edgeValues.place = place;
    this.edgeValues.minPrice = minPrice;
    this.edgeValues.maxPrice = maxPrice;
    this.edgeValues.endDate = endDate
    this.edgeValues.startDate = startDate;

    this.filter.place = place;
    this.filter.minPrice = minPrice;
    this.filter.maxPrice = maxPrice;
    this.filter.endDate = endDate
    this.filter.startDate = startDate;

    this.initialized = true;
  }
}
