import { Component, Input } from '@angular/core';
import { TripService } from '../../../services/trip/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthInfoService } from '../../../services/auth/auth-info.service';

@Component({
  selector: 'app-remove-trip',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './remove-trip.component.html',
  styleUrl: './remove-trip.component.css'
})
export class RemoveTripComponent {

  @Input() tripId!: string;

  constructor(private tripService: TripService, private router: Router, private authInfoService: AuthInfoService) {}

  removeTrip() {

    if(!this.authInfoService.currentUserSignal()?.user.role.includes("admin"))
      return

    this.tripService.deleteTrip(this.tripId).subscribe( respose => {
      this.router.navigate(['/trips']);
    });
  }
}
