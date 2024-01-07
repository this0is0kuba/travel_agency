import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { TripInterface } from '../../../models/TripInterface';
import { TripInfoService } from '../../../services/trip/trip-info.service';
import { CurrencyService } from '../../../services/currency/currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-item.component.html',
  styleUrl: './single-item.component.css'
})
export class SingleItemComponent {

  @Input() trip!: TripInterface;

  numberOfDays?: number;
  purchasedNumber: number = 0;

  @Output() changeCurrencyEvent = new EventEmitter();
  @Output() chnagePurchesedNumber = new EventEmitter<{id:string; added:boolean}>();

  @Input() selectedCurrency!: string;
  @Input() convertedPrice!: number;

  @Input() displayedIndex!: number;

  constructor(private tripInfoService: TripInfoService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    
    this.numberOfDays = (new Date(this.trip.endDate).getTime() - new Date(this.trip.startDate).getTime()) / (1000 * 60 * 60 * 24);
    this.purchasedNumber = this.tripInfoService.getPurchasedNumber(this.trip._id);

    // this.selectedCurrency = this.currencyService.getCurrentCurrency();
    // this.convertedPrice = CurrencyService.convertPLN(this.trip.price, this.selectedCurrency);
  }

  changeCurrency() {
    this.changeCurrencyEvent.emit();
  }

  addTrip() {
    
    this.tripInfoService.incrementCounter(this.trip._id);
    this.purchasedNumber = this.tripInfoService.getPurchasedNumber(this.trip._id);

    this.chnagePurchesedNumber.emit({id: this.trip._id, added: true});
  }

  removeTrip() {

    this.tripInfoService.decrementCounter(this.trip._id);
    this.purchasedNumber = this.tripInfoService.getPurchasedNumber(this.trip._id);

    this.chnagePurchesedNumber.emit({id: this.trip._id, added: false});
  }

}
