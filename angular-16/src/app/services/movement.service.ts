import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Movement } from '../models/movement';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment.prod';
import { map, catchError, of, Subscription } from 'rxjs';
const endpoint = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private usuarioSubscription: Subscription;

  public usuario: Usuario;
  public movement!: Movement;
  public movements: Movement[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  // private activatedRoute: ActivatedRoute
  {
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  getMovementsByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });

    return this.http.get(`${endpoint}/movements/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }

  getMovementsById( id:any) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.get(`${endpoint}/movement/${id}/`, {
      headers: {
        'x-token': token,
      },
    });
  }

  getMovementsByOid( oid:any) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.get(`${endpoint}/movements/item/${oid}/`, {
      headers: {
        'x-token': token,
      },
    });
  }
  setMovement(movement: any) {
    // sessionStorage.setItem('us',JSON.stringify(user))

    const token = sessionStorage.getItem('token') || '';

    return this.http.post(`${endpoint}/movements`,movement, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.movementN;
        }),
        catchError(error => {
          console.error('Error en la solicitud POST:', error);
          return of(error,'false'); // devuelve el error como un Observable
        })
      );
  }
  putMovement(movement: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/movements/${movement.id}`,movement, {
      headers: {
        'x-token': token,
      },
    });
  }
  delMovement(movement: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.delete(`${endpoint}/movements/${movement.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }

}
