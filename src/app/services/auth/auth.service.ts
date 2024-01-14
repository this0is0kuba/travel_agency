import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistrationInterface } from '../../models/UserRegistrationInterface';
import { UserIntrface } from '../../models/UserInterface';
import { UserLoginInterface } from '../../models/UserLoginInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  createNewUser(user: UserRegistrationInterface) {
    return this.http.post<UserIntrface>(this.apiUrl, user);
  }

  loginUser(user: UserLoginInterface) {

    const url = this.apiUrl + "/login";

    return this.http.post<UserIntrface>(url, user);
  }
}
