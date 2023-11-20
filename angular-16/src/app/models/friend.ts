import { environment } from "src/enviroments/environment.prod";

const base_url= environment.base_url


export class Friend {
    id!:string
    img:string = '';
    uid:string = '';
    fid:string = '';
    active:boolean = true;
}
