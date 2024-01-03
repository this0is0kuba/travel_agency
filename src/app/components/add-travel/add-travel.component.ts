import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripInterface } from '../../models/TripInterface';

@Component({
  selector: 'app-add-travel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-travel.component.html',
  styleUrl: './add-travel.component.css'
})
export class AddTravelComponent {

  newTrip: TripInterface = {
    id: 0,
    name: '',
    targetCountry: '',
    startDate: '',
    endDate: '',
    price: 0,
    amountOfFreePlaces: 0,
    description: '',
    imgSrc: '',
    allImgSrc: []
  }

  minImg: any;
  allImgs: any;

  onSubmit() {
    console.log(this.newTrip);
  }
}
