import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { Income } from '../models/income';
import { UsuarioService } from './usuario.service';
const endpoint = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private usuarioSubscription: Subscription;
  public usuario: Usuario;
  public income!: Income;
  public incomes: Income[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  // private activatedRoute: ActivatedRoute
  {
    this.usuario = usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

  getIncomesByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
    return this.http.get(`${endpoint}/incomes/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }
  setIncome(income: any) {
    // sessionStorage.setItem('us',JSON.stringify(user))

    const token = sessionStorage.getItem('token') || '';

    return this.http.post(`${endpoint}/incomes`,income, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(error => {
          console.error('Error en la solicitud POST:', error);
          return of(error,'false'); // devuelve el error como un Observable
        })
      );
  }
  putIncome(income: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/incomes/${income.id}`,income, {
      headers: {
        'x-token': token,
      },
    });
  }
  delIncome(income: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.delete(`${endpoint}/incomes/${income.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }

}
