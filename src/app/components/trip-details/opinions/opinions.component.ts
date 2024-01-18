import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpinionInterface } from '../../../models/OpinionInterface';
import { OpinionService } from '../../../services/trip/opinion.service';
import { AuthInfoService } from '../../../services/auth/auth-info.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.css'
})
export class OpinionsComponent implements OnInit {

  opinion: OpinionInterface = {
    tripId: '',
    userName: '',
    title: '',
    contents: '',
    stars: 0
  };

  @Input() tripId!: string;
  allOpinions: OpinionInterface[] = [];
  averageRating = 0;
  allCreatedOpinions: OpinionInterface[] = [];

  constructor(private opinionService: OpinionService, private authServiceInfo: AuthInfoService) {}

  ngOnInit(): void {
    
    this.opinionService.getOpinionsForTrip(this.tripId).subscribe( response => {

      this.allOpinions = response

      this.averageRating = 12; //change to 0 in the future

      for(let opinion of this.allOpinions)
        this.averageRating += opinion.stars;

      this.averageRating /= (this.allOpinions.length + 3) //delete 3 in the future

    });
  }

  addOpinion() {

    const newOpinion: OpinionInterface = this.opinion;

    newOpinion.tripId = this.tripId;
    newOpinion.userName = this.authServiceInfo.currentUserSignal()!.user.firstName;

    this.opinionService.createOpinionForTrip(newOpinion).subscribe()
    
    this.allCreatedOpinions.push(newOpinion);
  }

  checkValid(newOpinion: OpinionInterface): boolean {

    if(newOpinion.contents == undefined || newOpinion.stars == undefined || newOpinion.title == undefined)
      return true;

    if(newOpinion.contents?.trim() == "" || newOpinion.stars == 0 || newOpinion.title?.trim() == "")
      return true;

    if(newOpinion.contents?.trim().length < 50 || newOpinion.contents?.trim().length > 500)
      return true;

    return false;
  }
}
