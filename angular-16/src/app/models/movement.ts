import { environment } from "src/enviroments/environment.prod";

const endpoint = environment.base_url;

export class Movement {
    uid: string = '';
    oid: string = '';
    cant!: Number ;
    tipe!: string ;
    createAt: string = '';
    origin: string = '';
    img: string = '';
  }