import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TripsComponent, NavbarComponent, ShoppingCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'travel_agency';
}
