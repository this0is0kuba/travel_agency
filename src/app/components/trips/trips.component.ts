import { Component, OnInit } from '@angular/core';
import { TripComponent } from './trip/trip.component';
import { NgFor } from '@angular/common';
import { TripService } from '../../services/trip/trip.service';
import { TripInterface } from '../../models/TripInterface';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [TripComponent, NgFor, HttpClientModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
  providers: [TripService]
})
export class TripsComponent implements OnInit{

  trip_list!: TripInterface[];

  selectedCurrency: string = "PLN";
  convertedPrices: number[] = [];

  theCheapestTrip: number = -1;
  theMostExpensiveTrip: number = -1;

  constructor(private tripService: TripService, private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.selectedCurrency = this.currencyService.getCurrentCurrency();

    this.tripService.getTrips().subscribe( trips => {

      this.trip_list = trips;

      for(let trip of this.trip_list) {
        this.convertedPrices.push(CurrencyService.convertPLN(trip.price, this.selectedCurrency));
      }

      this.findTheCheapestTrip();
      this.findTheMostExpensiveTrip();

    }
  );
  }

  findTheCheapestTrip(): void {

    if(this.trip_list == undefined)
      return;

    this.theCheapestTrip =  this.trip_list.reduce((theCheapestTrip, currentTrip) => {
      return currentTrip.price > theCheapestTrip.price ? currentTrip : theCheapestTrip
    }, this.trip_list[0]).id;
  }

  findTheMostExpensiveTrip(): void {

    if(this.trip_list == undefined)
      return;

    this.theMostExpensiveTrip = this.trip_list.reduce((theMostExpensiveTrip, currentTrip) => {
      return currentTrip.price < theMostExpensiveTrip.price ? currentTrip : theMostExpensiveTrip
    }, this.trip_list[0]).id;
  }

  changeCurrency() {
    this.selectedCurrency = this.currencyService.getNextCurrency();

    for(let priceIndex in this.convertedPrices) {

      let priceInPLN: number = this.trip_list[priceIndex].price;
      this.convertedPrices[priceIndex] = CurrencyService.convertPLN(priceInPLN, this.selectedCurrency);
    }
  }


}
