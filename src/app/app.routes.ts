import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { AddTravelComponent } from './components/add-travel/add-travel.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "trips", component: TripsComponent},
    {path: "manage", component: AddTravelComponent},
    {path: "trips/:id", component: TripDetailsComponent},
    {path: "cart", component: ShoppingCartComponent}
];
