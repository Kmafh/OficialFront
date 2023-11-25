import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
const base_url= environment.base_url
const endpoint: any = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MailService {

  
  // constructor(private http: HttpClient,
  //   private router: Router,) { }

  // sendEmail(value: any) {
    
  //   const token = sessionStorage.getItem('token') || '';

  //   return this.http.post(`${endpoint}/login/sendMail`,value, {
  //     })
  //     .pipe(
  //       map((resp: any) => {
  //         return resp;
  //       }),
  //       catchError(error => {
  //         console.error('Error en la solicitud POST:', error);
  //         return of(error,'false'); // devuelve el error como un Observable
  //       })
  //     );
  // }
}
