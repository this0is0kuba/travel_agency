import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Opinion } from '../../../models/Opinion';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.css'
})
export class OpinionsComponent {

  opinion: Opinion = {
    text: "",
    stars: 0
  };

  addOpinion(newOpinion: Opinion) {
    
    console.log(newOpinion);
  }

  checkValid(newOpinion: Opinion): boolean {

    if(newOpinion.text == undefined || newOpinion.stars == undefined)
      return true;

    if(newOpinion.text?.trim() == "" || newOpinion.stars == 0)
      return true;

    return false;
  }
}
