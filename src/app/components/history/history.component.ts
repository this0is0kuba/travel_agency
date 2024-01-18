import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';
import { HistoryService } from '../../services/trip/history.service';
import { AuthInfoService } from '../../services/auth/auth-info.service';
import { NgFor, NgIf } from '@angular/common';
import { HistoryInterface } from '../../models/HistoryInterface';
import { TripInterface } from '../../models/TripInterface';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  infoArray: [HistoryInterface, TripInterface][]  = []

  constructor(private tripService: TripService, private historyService: HistoryService, private authInfoService: AuthInfoService) {}

  ngOnInit(): void {

    const userId = this.authInfoService.currentUserSignal()!.user._id;

    this.historyService.getHistryForUser(userId).subscribe( historyResponse => {
      
      for(let history of historyResponse) {
        this.tripService.getTrip(history.tripId).subscribe( tripResponse => {
            this.infoArray.push([history, tripResponse]);
        });
      }

    });

  }


}
