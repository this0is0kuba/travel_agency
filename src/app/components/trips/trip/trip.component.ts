import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { TripInterface } from '../../../models/TripInterface';
import { CommonModule} from '@angular/common';
import { TripInfoService } from '../../../services/trip/trip-info.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})

export class TripComponent implements OnInit {

  @Input() trip! : TripInterface;
  @Input() borderColorClass: string = "border-gray";

  numberOfDays?: number;
  purchasedNumber: number = 0;
  
  @Output() changeCurrencyEvent = new EventEmitter();
  @Input() selectedCurrency!: string;
  @Input() convertedPrice!: number;

  constructor(private tripInfoService: TripInfoService) {}

  ngOnInit(): void {

    this.numberOfDays = (new Date(this.trip.endDate).getTime() - new Date(this.trip.startDate).getTime()) / (1000 * 60 * 60 * 24);
    this.purchasedNumber = this.tripInfoService.getPurchesedNumber(this.trip.id);
  }

  addTrip() {
    this.tripInfoService.incrementCounter(this.trip.id);
    this.purchasedNumber = this.tripInfoService.getPurchesedNumber(this.trip.id);
  }

  removeTrip() {
    this.tripInfoService.decrementCounter(this.trip.id);
    this.purchasedNumber = this.tripInfoService.getPurchesedNumber(this.trip.id);
  }

  changeCurrency() {
    this.changeCurrencyEvent.emit();
  }
}
