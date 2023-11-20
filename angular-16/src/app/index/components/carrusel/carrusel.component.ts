import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {
  images = ['../../../../assets/images/background/fondo.png', '../../../../assets/images/background/woman.png'];
  currentIndex = 0;
  prevIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.prevIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.prevIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 20000);
  }

  stopAutoPlay() {
    clearInterval(this.intervalId);
  }
}
