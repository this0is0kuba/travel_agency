import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { AddTravelComponent } from './components/add-travel/add-travel.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';

export const routes: Routes = [
    {path: "", redirectTo: "/trips", pathMatch: "full"},
    {path: "trips", component: TripsComponent},
    {path: "manage", component: AddTravelComponent},
    {path: "trips/:id", component: TripDetailsComponent}
];
