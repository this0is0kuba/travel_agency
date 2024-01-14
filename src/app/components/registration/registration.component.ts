import { Component } from '@angular/core';
import { UserRegistrationInterface } from '../../models/UserRegistrationInterface';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthInfoService } from '../../services/auth/auth-info.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [AuthService]
})
export class RegistrationComponent {

  new_user: UserRegistrationInterface = {
    email: '',
    password: '',
    repeated_password: '',
    first_name: '',
    last_name: '',
    date_of_birth: ''
  }

  constructor(private authService: AuthService, private authInfoService: AuthInfoService, private router: Router) {}

  onSubmit(newUser: UserRegistrationInterface) {

    if(!this.validaton(newUser)) 
      return;

    this.authService.createNewUser(newUser).subscribe(response => {
      console.log(response);
      localStorage.setItem('token', response.token);
      this.authInfoService.currentUserSignal.set(response);

      this.router.navigate(['home']);
    })
  }

  validaton(newUser: UserRegistrationInterface): boolean {
    
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


    const repeatedPasswordField = document.getElementById('repeated_password');
    if(newUser.repeated_password == '') {
     
      repeatedPasswordField?.classList.remove('is-valid');
      repeatedPasswordField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      repeatedPasswordField?.classList.remove('is-invalid');
      repeatedPasswordField?.classList.add('is-valid');
    }


    const firstNameField = document.getElementById('first_name');
    if(newUser.first_name == '') {
     
      firstNameField?.classList.remove('is-valid');
      firstNameField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      firstNameField?.classList.remove('is-invalid');
      firstNameField?.classList.add('is-valid');
    }


    const lastNameField = document.getElementById('last_name');
    if(newUser.last_name == '') {
     
      lastNameField?.classList.remove('is-valid');
      lastNameField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      lastNameField?.classList.remove('is-invalid');
      lastNameField?.classList.add('is-valid');
    }


    const dateOfBirthField = document.getElementById('date_of_birth');
    if(newUser.date_of_birth == '') {
     
      dateOfBirthField?.classList.remove('is-valid');
      dateOfBirthField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      dateOfBirthField?.classList.remove('is-invalid');
      dateOfBirthField?.classList.add('is-valid');
    }


    // more validation rules
    if(newUser.repeated_password != newUser.password) {

      repeatedPasswordField?.classList.remove('is-valid');
      repeatedPasswordField?.classList.add('is-invalid');

      isValidationSuccess = false;
    } 
    else {
      repeatedPasswordField?.classList.remove('is-invalid');
      repeatedPasswordField?.classList.add('is-valid');
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
