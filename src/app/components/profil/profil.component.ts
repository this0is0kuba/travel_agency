import { Component } from '@angular/core';
import { UserInfoInterface } from '../../models/UserInfoInterface';
import { AuthInfoService } from '../../services/auth/auth-info.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

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
    first_name: '',
    last_name: '',
    date_of_birth: ''
  }

  userLogged: boolean = false;
  
  constructor(private authInfoService: AuthInfoService, private router: Router) {}

  ngOnInit(): void {
    
    const loginSignal = this.authInfoService.currentUserSignal(); 

    console.log(loginSignal);

    if(loginSignal != undefined && loginSignal != null)
      this.userLogged = true;
  }

  logOut() {
    console.log("log out");
    this.authInfoService.currentUserSignal.set(null);
    localStorage.removeItem('token')

    this.router.navigate(["/login"])
  }
}
