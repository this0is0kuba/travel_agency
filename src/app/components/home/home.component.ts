import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthInfoService } from '../../services/auth/auth-info.service';
import { NgIf } from '@angular/common';
import { UserInfoInterface } from '../../models/UserInfoInterface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
}
