import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { Alert } from '../models/alert';
import { UsuarioService } from './usuario.service';
const endpoint = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private usuarioSubscription: Subscription;
  public usuario: Usuario;
  public alert!: Alert;
  public alerts: Alert[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  // private activatedRoute: ActivatedRoute
  {
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  getAlertsByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
    return this.http.get(`${endpoint}/alerts/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }
  setAlert(alert: any) {
    // sessionStorage.setItem('us',JSON.stringify(user))

    const token = sessionStorage.getItem('token') || '';

    return this.http.post(`${endpoint}/alerts`,alert, {
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
  putAlert(alert: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/alerts/${alert.id}`,alert, {
      headers: {
        'x-token': token,
      },
    });
  }
  delAlert(alert: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.delete(`${endpoint}/alerts/${alert.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }
}
