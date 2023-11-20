import { environment } from "src/enviroments/environment.prod";

const base_url= environment.base_url


export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public img: string,
      //   
        public uid: string,
        
        public role?: string,
        
        public google?: boolean,
        public fondo?: string,

        public password?: string,
        public active?: boolean,
    ){}


    get getImgUrl(){
        if(!this.img){
            return base_url+'/upload/usuarios/no-img';
         } else if(this.img.includes('https')){
            return this.img;
         } else if(this.img){
            return base_url+'/upload/usuarios/'+this.img;
         } else {
           return base_url+'/upload/usuarios/no-img';
        }
    }

    get getFondoUrl(){
        if(!this.fondo){
            return base_url+'/upload/fondo/user-info.jpg';
         } else if(this.fondo.includes('https')){
            return this.fondo;
         } else if(this.fondo){
            return base_url+'/upload/fondo/'+this.fondo;
         } else {
           return base_url+'/upload/fondo/user-info.jpg';
        }
    }
}
