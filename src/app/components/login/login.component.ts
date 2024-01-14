import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLoginInterface } from '../../models/UserLoginInterface';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AuthInfoService } from '../../services/auth/auth-info.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {

  user_login: UserLoginInterface  = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private authInfoService: AuthInfoService, private router: Router) {}

  onSubmit(loginUser: UserLoginInterface) {

    if(!this.validaton(loginUser)) 
      return;

    this.authService.loginUser(loginUser).subscribe(response => {

        console.log(response);
        localStorage.setItem('token', response.token);
        this.authInfoService.currentUserSignal.set(response);
        this.router.navigate(['/home'])
    })
  }

  validaton(newUser: UserLoginInterface): boolean {
    
    let isValidationSuccess = true;

    const emailField = document.getElementById('email');
    if(newUser.email == '') {
     
      emailField?.classList.remove('is-valid');
      emailField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      emailField?.classList.remove('is-invalid');
      emailField?.classList.add('is-valid');
    }


    const passwordField = document.getElementById('password');
    if(newUser.password == '') {
     
      passwordField?.classList.remove('is-valid');
      passwordField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      passwordField?.classList.remove('is-invalid');
      passwordField?.classList.add('is-valid');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(newUser.email)) {

      emailField?.classList.remove('is-valid');
      emailField?.classList.add('is-invalid');
      
      isValidationSuccess = false;
    }
    else {
      emailField?.classList.remove('is-invalid');
      emailField?.classList.add('is-valid');
    }

    return isValidationSuccess;
  }
}
