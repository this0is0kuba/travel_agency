import { Injectable } from '@angular/core';
import { Filter } from '../../models/Filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter: Filter = {
    place: [],
    minPrice: 0,
    maxPrice: 100000,
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
}
