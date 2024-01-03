import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-img-slider',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './img-slider.component.html',
  styleUrl: './img-slider.component.css'
})
export class ImgSliderComponent {

  @Input() imagesSrc?: string[] = [];

  display(id: number) {

    const carouselElement = document.getElementById("carouselExample");
    const carousel = new bootstrap.Carousel(carouselElement);

    carousel.to(id);
  }
}
