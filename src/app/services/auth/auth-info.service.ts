import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../../models/UserInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInfoService {

  public currentUserSignal = signal<UserInterface | null | undefined>(undefined);
  public isUserChecked: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
