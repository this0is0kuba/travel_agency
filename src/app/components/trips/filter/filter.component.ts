import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Filter } from '../../../models/Filter';
import { TripInterface } from '../../../models/TripInterface';
import { FilterService } from '../../../services/filter/filter.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{

  @Input() trips!: TripInterface[];
  @Output() newTripsEvent = new EventEmitter<TripInterface[]>();

  countries: string[] = [];

  filter: Filter = {
    place: [],
    minPrice: 0,
    maxPrice: 100000,
    minStars: 1,
    startDate: null,
    endDate: null
  }

  constructor(private filterService: FilterService) {}

  ngOnInit() {

    this.filterService.setInitial(this.trips);
    this.countries = this.filterService.getEdgeValues().place;

    this.filter = this.filterService.getFilter();
    this.filterTrips(this.filter);
  }

  filterTrips(newFilter: Filter) {

    this.filterService.updateFilter(newFilter);

    let newTrips = [...this.trips];

    if(newFilter.place.length > 0)
      newTrips = newTrips.filter(trip => newFilter.place.includes(trip.targetCountry));

    if(newFilter.minPrice != null && newFilter.minPrice > this.filterService.getEdgeValues().minPrice)
      newTrips = newTrips.filter(trip => trip.price >= newFilter.minPrice);

    if(newFilter.maxPrice != null && newFilter.maxPrice < this.filterService.getEdgeValues().maxPrice)
      newTrips = newTrips.filter(trip => trip.price <= newFilter.maxPrice);

    // if(newFilter.minStars != null && newFilter.minStars > 1)
    //   newTrips = newTrips.filter(trip => trip.stars >= newFilter.minStars);

    const theStartDate = newFilter.startDate;
    if(theStartDate != null && theStartDate != '')
      newTrips = newTrips.filter(trip => new Date(trip.startDate) >= new Date(theStartDate));

    const theEndDate = newFilter.endDate;
    if(theEndDate != null && theEndDate != '')
      newTrips = newTrips.filter(trip => new Date(trip.endDate) <= new Date(theEndDate));

    this.newTripsEvent.emit(newTrips);
  }
}
