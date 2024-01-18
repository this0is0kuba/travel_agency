import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { AddTravelComponent } from './components/add-travel/add-travel.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { Error404Component } from './components/error404/error404.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { authGuard } from './authentication/authGuard';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "profil", component: ProfilComponent},
    {path: "home", component: HomeComponent},
    {path: "trips", component: TripsComponent},
    {path: "manage", component: AddTravelComponent, canActivate: [authGuard]},
    {path: "trips/:id", component: TripDetailsComponent, canActivate: [authGuard]},
    {path: "cart", component: ShoppingCartComponent, canActivate: [authGuard]},
    {path: "history", component: HistoryComponent, canActivate: [authGuard]},
    {path: "**", component: Error404Component},
];
