import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linkTheme = document.querySelector('#theme')!;
  public links: NodeListOf<Element>;

  constructor() { 
    const url = localStorage.getItem('theme') || './assets/css/colors/$green.css'
    this.linkTheme?.setAttribute('href',url);
    this.links = document.querySelectorAll('.selector');
    console.log("Setting Server init")
  }

  changeTheme(theme:string){

    this.links = document.querySelectorAll('.selector');
    const url= `./assets/css/colors/${ theme}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCourrentTheme()
  }

  checkCourrentTheme() {
    this.links = document.querySelectorAll('.selector');
    this.links.forEach((item:any) => {
      item.classList.remove('working');

      const btnTheme = item.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme}.css`
      const currentTheme = this.linkTheme.getAttribute('href');
      if( btnThemeUrl === currentTheme ) {
        item.classList.add('working');
      }
    })
  }
}
