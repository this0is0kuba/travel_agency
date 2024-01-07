import { Component, Input } from '@angular/core';
import { TripService } from '../../../services/trip/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-trip',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './remove-trip.component.html',
  styleUrl: './remove-trip.component.css',
  providers: [TripService]
})
export class RemoveTripComponent {

  @Input() tripId!: string;

  constructor(private tripService: TripService, private router: Router) {}

  removeTrip() {
    this.tripService.deleteTrip(this.tripId).subscribe( respose => {
      this.router.navigate(['/trips']);
    });

    
  }
}
