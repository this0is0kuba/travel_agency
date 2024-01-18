import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistrationInterface } from '../../models/UserRegistrationInterface';
import { UserInterface } from '../../models/UserInterface';
import { UserLoginInterface } from '../../models/UserLoginInterface';
import { UserInfoInterface } from '../../models/UserInfoInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  createNewUser(user: UserRegistrationInterface) {
    return this.http.post<UserInterface>(this.apiUrl, user);
  }

  loginUser(user: UserLoginInterface) {

    const url = this.apiUrl + "/login";

    return this.http.post<UserInterface>(url, user);
  }

  checkToken() {

    const url = this.apiUrl + "/checkToken";

    return this.http.get<UserInterface>(url);
  }
}
