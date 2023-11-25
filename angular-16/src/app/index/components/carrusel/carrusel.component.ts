import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {
  @Input() opcion:boolean = false
  images = ['../../../../assets/images/background/fondo.png', '../../../../assets/images/background/woman.png'];
  images2 = ['../../../../assets/images/background/fondosmall.png', '../../../../assets/images/background/arbol.jpg'];
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
  getOption() {
    return this.opcion;
  }
}
