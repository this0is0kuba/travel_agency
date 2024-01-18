import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthService } from './services/auth/auth.service';
import { AuthInfoService } from './services/auth/auth-info.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TripsComponent, NavbarComponent, ShoppingCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent implements OnInit{
  
  title = 'travel_agency';

  constructor(private authService: AuthService, private authInfoService: AuthInfoService) {}

  ngOnInit(): void {
      
    this.authService.checkToken().subscribe({
      next: (response) => {
        
        this.authInfoService.currentUserSignal.set({token: response.token, user: response.user});
        this.authInfoService.isUserChecked.next(true);
      },
      error: (err) => {
        this.authInfoService.currentUserSignal.set(null); 
        this.authInfoService.isUserChecked.next(true);
      }
    })
  }
}
