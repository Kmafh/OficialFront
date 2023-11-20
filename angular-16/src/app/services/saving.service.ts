import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { Saving } from '../models/saving';
import { UsuarioService } from './usuario.service';
const endpoint = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private usuarioSubscription: Subscription;

  public usuario: Usuario;
  public saving!: Saving;
  public savings: Saving[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  // private activatedRoute: ActivatedRoute
  {
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  async getSavingsByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
    return this.http.get(`${endpoint}/savings/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }
  setSaving(saving: any) {
    // sessionStorage.setItem('us',JSON.stringify(user))

    const token = sessionStorage.getItem('token') || '';

    return this.http.post(`${endpoint}/savings`,saving, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.saving;
        }),
        catchError(error => {
          console.error('Error en la solicitud POST:', error);
          return of(error,'false'); // devuelve el error como un Observable
        })
      );
  }
  putSaving(saving: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/savings/${saving.id}`,saving, {
      headers: {
        'x-token': token,
      },
    });
  }
  delSaving(saving: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.delete(`${endpoint}/savings/${saving.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }

}
