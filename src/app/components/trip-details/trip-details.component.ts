import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip/trip.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TripInterface } from '../../models/TripInterface';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { CompleteInfoComponent } from './complete-info/complete-info.component';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';
import { OpinionsComponent } from './opinions/opinions.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [HttpClientModule, ImgSliderComponent, CompleteInfoComponent, NgIf, OpinionsComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css',
  providers: [TripService]
})

export class TripDetailsComponent implements OnInit{

  tripInfo!: TripInterface;

  constructor(private tripService: TripService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    const id: string = this.activatedRoute.snapshot.params['id'];

    this.tripService.getTrip(parseInt(id)).subscribe( response => {

        this.tripInfo = response;
    });
  }
}
