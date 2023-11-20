import { environment } from 'src/enviroments/environment.prod';

const base_url = environment.base_url;

export class Project {
  id!: string;
  titulo: string = '';
  actual: number = 0;
  cuota: number = 0;
  cantObjetivo: number = 0;
  description: string = '';
  active: boolean = true;
  uid: string = '';
  tipe: string = '';
  createAt: string = '';
  finishAt: string = '';
  oid: string = '';
  img: string = '';
  get getImgUrl() {
    if (!this.img) {
      return base_url + '/upload/projects/no-img';
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return base_url + '/upload/projects/' + this.img;
    } else {
      return base_url + '/upload/projects/no-img';
    }
  }
}
