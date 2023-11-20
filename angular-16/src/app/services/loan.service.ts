import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { Loan } from '../models/loan';
import { UsuarioService } from './usuario.service';
const endpoint = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private usuarioSubscription: Subscription;

  public usuario: Usuario;
  public loan!: Loan;
  public loans: Loan[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  // private activatedRoute: ActivatedRoute
  {
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  getLoansByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
    return this.http.get(`${endpoint}/loans/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }
  setLoan(loan: any) {
    // sessionStorage.setItem('us',JSON.stringify(user))

    const token = sessionStorage.getItem('token') || '';

    return this.http.post(`${endpoint}/loans`,loan, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.loan;
        }),
        catchError(error => {
          console.error('Error en la solicitud POST:', error);
          return of(error,'false'); // devuelve el error como un Observable
        })
      );
  }
  putLoan(loan: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/loans/${loan.id}`,loan, {
      headers: {
        'x-token': token,
      },
    });
  }
  delLoan(loan: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.delete(`${endpoint}/loans/${loan.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }

}
