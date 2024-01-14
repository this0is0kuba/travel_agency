import { Injectable, signal } from '@angular/core';
import { UserIntrface } from '../../models/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthInfoService {

  public currentUserSignal = signal<UserIntrface | null | undefined>(undefined);
}
