import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent {

  page: String = ""

  constructor(private router:Router){
    setTimeout(() => {
      this.getPag()
  }, 2500);
   
  }
  getPag() {
    let pag: String  = sessionStorage.getItem('pag')!
    switch(pag){
      case null:
      this.router.navigate(['dashboard']);
        break;
        case 'dash':
      this.router.navigate(['dashboard']);
        break;
        case 'gestion':
      this.router.navigate(['gestion']);
        break;
        case 'futuro':
      this.router.navigate(['prestamos']);
        break;
    }
  }
}
