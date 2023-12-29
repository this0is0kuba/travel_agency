import { Component, OnInit } from '@angular/core';
import { TripInfoService } from '../../services/trip/trip-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  numberOfAddedTrips: number = 0;

  constructor(private tripInfoService: TripInfoService) {}

  ngOnInit(): void {
      this.numberOfAddedTrips = this.tripInfoService.numberOfAddedTrips;

      this.tripInfoService.getNumberOfAddedTrips().subscribe( value => this.numberOfAddedTrips = value);
  }
}
