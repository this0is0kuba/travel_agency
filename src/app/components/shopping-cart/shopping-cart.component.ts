import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';
import { TripInfoService } from '../../services/trip/trip-info.service';
import { TripInterface } from '../../models/TripInterface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SingleItemComponent } from './single-item/single-item.component';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgFor, HttpClientModule, SingleItemComponent, CommonModule, NgIf],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  providers: [TripService]
})
export class ShoppingCartComponent implements OnInit{

  trips!: TripInterface[];
  reservedTrips: TripInterface[] = [];

  selectedCurrency: string = "PLN";
  convertedPrices: number[] = [];

  totalCost: number = 0;

  constructor(private tripService: TripService, private tripInfoService: TripInfoService, private currencyService: CurrencyService) {}

  ngOnInit(): void {

    this.selectedCurrency = this.currencyService.getCurrentCurrency();
      
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips;  

      for(let i in this.trips) {

        const index = parseInt(i);
  
        if(this.tripInfoService.getPurchesedNumber(index + 1) > 0)
          this.reservedTrips.push(this.trips[index]);
        
      }

      this.convertedPrices = [];
      for(let trip of this.reservedTrips) {

        const convertedPrice: number = CurrencyService.convertPLN(trip.price, this.selectedCurrency);

        this.convertedPrices.push(convertedPrice);
        this.totalCost += convertedPrice * this.tripInfoService.getPurchesedNumber(trip.id);
      }

    })
  }

  changeCurrency() {
    
    this.selectedCurrency = this.currencyService.getNextCurrency();
    
    for(let priceIndex in this.reservedTrips) {

      let priceInPLN: number = this.trips[priceIndex].price;
      this.convertedPrices[priceIndex] = CurrencyService.convertPLN(priceInPLN, this.selectedCurrency);
    }
    
    this.totalCost = 0
    for(let trip of this.reservedTrips)
      this.totalCost += CurrencyService.convertPLN(trip.price, this.selectedCurrency) * this.tripInfoService.getPurchesedNumber(trip.id);
  }

  changePurchesed(info: {id: number, added: boolean}) {

    if(info.added)
      this.totalCost += CurrencyService.convertPLN(this.trips[info.id - 1].price, this.selectedCurrency)
    else
      this.totalCost -= CurrencyService.convertPLN(this.trips[info.id - 1].price, this.selectedCurrency)
  }
}