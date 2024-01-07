import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TripInterface } from '../../models/TripInterface';
import { TripService } from '../../services/trip/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { newTripInterface } from '../../models/newTripInterface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-travel',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-travel.component.html',
  styleUrl: './add-travel.component.css',
  providers: [TripService]
})
export class AddTravelComponent {

  newTrip: newTripInterface = {
    name: "",
    targetCountry: '',
    startDate: '',
    endDate: '',
    price: 0,
    amountOfFreePlaces: 0,
    description: '',

    mainImg: null,
    allMiniImg: undefined,
    allLargeImg: undefined
  };

  @ViewChild('addTripForm', { static: false }) addTripForm!: NgForm;

  constructor(private tripService: TripService, private router: Router) {}

  onSubmit() {
    
    if(this.validation() == false)
      return;

    this.tripService.addTrip(this.newTrip).subscribe( response =>
    
      this.router.navigate(["/trips"])
    );
  }

  onMainFileSelected(event : any) {
    this.newTrip.mainImg =  event.target.files[0];
  }

  onMiniFilesSelected(event: any) {
    this.newTrip.allMiniImg = event.target.files;
  }

  onLargeFilesSelected(event: any) {
    this.newTrip.allLargeImg = event.target.files;
  }

  validation() : boolean {

    let isValidationSuccess = true;

    const nameField = document.getElementById('name');
    if(this.newTrip.name == '') {
     
      nameField?.classList.remove('is-valid');
      nameField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      nameField?.classList.remove('is-invalid');
      nameField?.classList.add('is-valid');
    }


    const targetCountryField = document.getElementById('targetCountry');
    if(this.newTrip.targetCountry == '') {

      targetCountryField?.classList.remove('is-valid');
      targetCountryField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      targetCountryField?.classList.remove('is-invalid');
      targetCountryField?.classList.add('is-valid');
    }


    const startDateField = document.getElementById('startDate');
    if(this.newTrip.startDate == '') {

      startDateField?.classList.remove('is-valid');
      startDateField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      startDateField?.classList.remove('is-invalid');
      startDateField?.classList.add('is-valid');
    }


    const description = document.getElementById('description');
    if(this.newTrip.description == '') {

      description?.classList.remove('is-valid');
      description?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      description?.classList.remove('is-invalid');
      description?.classList.add('is-valid');
    }


    const endDateField = document.getElementById('endDate');
    if(this.newTrip.endDate == '')  {

      endDateField?.classList.remove('is-valid');
      endDateField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      endDateField?.classList.remove('is-invalid');
      endDateField?.classList.add('is-valid');
    }


    const priceField = document.getElementById('price');
    if(this.newTrip.price == null  || this.newTrip.price <= 0 ) {

      priceField?.classList.remove('is-valid');
      priceField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      priceField?.classList.remove('is-invalid');
      priceField?.classList.add('is-valid');
    }


    const amountOfFreePlacesField = document.getElementById('amountOfFreePlaces');
    if(this.newTrip.amountOfFreePlaces == null || this.newTrip.amountOfFreePlaces <= 0) {

      amountOfFreePlacesField?.classList.remove('is-valid');
      amountOfFreePlacesField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      amountOfFreePlacesField?.classList.remove('is-invalid');
      amountOfFreePlacesField?.classList.add('is-valid');
    }

    const mainImgField = document.getElementById('mainImg');  
    if(this.newTrip.mainImg == undefined || this.newTrip.mainImg == null)  {

      mainImgField?.classList.remove('is-valid');
      mainImgField?.classList.add('is-invalid');

      isValidationSuccess = false;
    }
    else {
      mainImgField?.classList.remove('is-invalid');
      mainImgField?.classList.add('is-valid');
    }

    return isValidationSuccess;
  }

}
