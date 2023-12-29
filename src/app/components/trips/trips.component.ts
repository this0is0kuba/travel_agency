import { Component, OnInit } from '@angular/core';
import { TripComponent } from './trip/trip.component';
import { NgFor } from '@angular/common';
import { TripService } from '../../services/trip/trip.service';
import { TripInterface } from '../../models/TripInterface';
import { HttpClientModule } from '@angular/common/http';
import { SupportedCurrencies } from '../../models/SupportedCurrencies';

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

  supportedCurrencies: SupportedCurrencies = new SupportedCurrencies();
  selectedCurrency: string = "PLN";
  convertedPrices: number[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit(): void {

    this.tripService.getTrips().subscribe( trips => {

      this.trip_list = trips;

      for(let trip of this.trip_list) {
        this.convertedPrices.push(trip.price);
      }

    }
  );
  }

  findTheCheapestTrip(): number {
    return this.trip_list.reduce((theCheapestTrip, currentTrip) => {
      return currentTrip.price > theCheapestTrip.price ? currentTrip : theCheapestTrip
    }, this.trip_list[0]).id;
  }

  findTheMostExpensiveTrip(): number {
    return this.trip_list.reduce((theMostExpensiveTrip, currentTrip) => {
      return currentTrip.price < theMostExpensiveTrip.price ? currentTrip : theMostExpensiveTrip
    }, this.trip_list[0]).id;
  }

  changeCurrency() {
    this.selectedCurrency = this.supportedCurrencies.getNextCurrency();

    for(let priceIndex in this.convertedPrices) {

      let priceInPLN: number = this.trip_list[priceIndex].price;
      this.convertedPrices[priceIndex] = SupportedCurrencies.convertPLN(priceInPLN, this.selectedCurrency);
    }
  }


}
