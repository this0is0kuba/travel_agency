import { Component, Input, OnInit } from '@angular/core';
import { TripInterface } from '../../../models/TripInterface';
import { CommonModule } from '@angular/common';
import { TripInfoService } from '../../../services/trip/trip-info.service';
import { CurrencyService } from '../../../services/currency/currency.service';

@Component({
  selector: 'app-complete-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complete-info.component.html',
  styleUrl: './complete-info.component.css'
})
export class CompleteInfoComponent implements OnInit{

  @Input() trip!: TripInterface;

  numberOfDays?: number;
  purchasedNumber: number = 0;

  selectedCurrency!: string;
  convertedPrice!: number;

  constructor(private tripInfoService: TripInfoService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    
    this.numberOfDays = (new Date(this.trip.endDate).getTime() - new Date(this.trip.startDate).getTime()) / (1000 * 60 * 60 * 24);
    this.purchasedNumber = this.tripInfoService.getPurchasedNumber(this.trip._id);

    this.selectedCurrency = this.currencyService.getCurrentCurrency();
    this.convertedPrice = CurrencyService.convertPLN(this.trip.price, this.selectedCurrency);
  }

  changeCurrency() {
    this.selectedCurrency = this.currencyService.getNextCurrency();
    this.convertedPrice = CurrencyService.convertPLN(this.trip.price, this.selectedCurrency);
  }

  addTrip() {
    this.tripInfoService.incrementCounter(this.trip._id);
    this.purchasedNumber = this.tripInfoService.getPurchasedNumber(this.trip._id);
  }

  removeTrip() {
    this.tripInfoService.decrementCounter(this.trip._id);
    this.purchasedNumber = this.tripInfoService.getPurchasedNumber(this.trip._id);
  }
}
