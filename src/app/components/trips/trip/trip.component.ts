import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { TripInterface } from '../../../models/TripInterface';
import { CommonModule} from '@angular/common';
import { TripInfoService } from '../../../services/trip/trip-info.service';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule],
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
    this.convertedPrice = this.trip.price;
  }

  addTrip() {
    this.purchasedNumber ++;
    this.tripInfoService.incrementCounter();
  }

  removeTrip() {
    this.purchasedNumber --;
    this.tripInfoService.decrementCounter();
  }

  changeCurrency() {
    this.changeCurrencyEvent.emit();
  }
}
