import { Component } from '@angular/core';
import { UserInfoInterface } from '../../models/UserInfoInterface';
import { AuthInfoService } from '../../services/auth/auth-info.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TripInfoService } from '../../services/trip/trip-info.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  userInfo: UserInfoInterface = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    role: []
  }

  userLogged: boolean = false;
  userChecked: boolean = false;
  
  constructor(private authInfoService: AuthInfoService, private router: Router, private tripInfoService: TripInfoService) {}

  ngOnInit(): void {

    this.authInfoService.isUserChecked.subscribe( (value) => {

      if(value == true) {
        const loginSignal = this.authInfoService.currentUserSignal(); 

        if(loginSignal !== undefined && loginSignal !== null) {
          this.userLogged = true;
          this.userInfo = loginSignal!.user;
        }
      }

      this.userChecked = value;
    })
  }

  logOut() {
    this.authInfoService.currentUserSignal.set(null);
    localStorage.removeItem('token')

    this.tripInfoService.reset();
    this.router.navigate(["/login"])
  }
}
