import { Component, OnInit } from '@angular/core';
import { TripComponent } from './trip/trip.component';
import { NgFor, NgIf } from '@angular/common';
import { TripService } from '../../services/trip/trip.service';
import { TripInterface } from '../../models/TripInterface';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from '../../services/currency/currency.service';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [TripComponent, NgFor, HttpClientModule, FilterComponent, NgIf],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
  providers: [TripService]
})
export class TripsComponent implements OnInit{

  trip_list!: TripInterface[];
  filteredTrips!: TripInterface[];

  selectedCurrency: string = "PLN";
  convertedPrices: number[] = [];

  theCheapestTrip: number = -1;
  theMostExpensiveTrip: number = -1;

  constructor(private tripService: TripService, private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.selectedCurrency = this.currencyService.getCurrentCurrency();

    this.tripService.getTrips().subscribe( trips => {

      this.trip_list = trips;
      this.filteredTrips = [...trips];

      this.convertedPrices = [];
      for(let trip of this.filteredTrips)
        this.convertedPrices.push(CurrencyService.convertPLN(trip.price, this.selectedCurrency));

      this.findTheCheapestTrip();
      this.findTheMostExpensiveTrip();

    }
  );
  }

  findTheCheapestTrip(): void {

    if(this.filteredTrips.length == 0)
      return;

    this.theCheapestTrip =  this.filteredTrips.reduce((theCheapestTrip, currentTrip) => {
      return currentTrip.price > theCheapestTrip.price ? currentTrip : theCheapestTrip
    }, this.filteredTrips[0]).id;
  }

  findTheMostExpensiveTrip(): void {

    if(this.filteredTrips.length == 0)
      return;

    this.theMostExpensiveTrip = this.filteredTrips.reduce((theMostExpensiveTrip, currentTrip) => {
      return currentTrip.price < theMostExpensiveTrip.price ? currentTrip : theMostExpensiveTrip
    }, this.filteredTrips[0]).id;
  }

  changeCurrency() {
    this.selectedCurrency = this.currencyService.getNextCurrency();

    for(let priceIndex in this.convertedPrices) {

      let priceInPLN: number = this.trip_list[priceIndex].price;
      this.convertedPrices[priceIndex] = CurrencyService.convertPLN(priceInPLN, this.selectedCurrency);
    }
  }

  updateTrips(filteredTrips: TripInterface[]) {
    
    this.filteredTrips = filteredTrips;

    this.convertedPrices = [];
    for(let trip of this.filteredTrips)
        this.convertedPrices.push(CurrencyService.convertPLN(trip.price, this.selectedCurrency));

    this.findTheCheapestTrip();
    this.findTheMostExpensiveTrip();
  }
}
