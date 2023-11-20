import { environment } from 'src/enviroments/environment.prod';

const base_url = environment.base_url;

export class Saving {
  id!: string;
  origin: string = '';
  cant: number = 0;
  cantFinish: number = 0;
  description: string = '';
  active: boolean = true;
  uid: string = '';
  tipe: string = '';
  createAt: string = '';
  finishAt: string = '';
  img: string = '';

  get getImgUrl() {
    if (!this.img) {
      return base_url + '/upload/savings/no-img';
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return base_url + '/upload/savings/' + this.img;
    } else {
      return base_url + '/upload/savings/no-img';
    }
  }
}
