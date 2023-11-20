import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';
import { Friend } from '../models/friend';
const endpoint = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private usuarioSubscription: Subscription;

  public usuario: Usuario;
  public friend!: Friend;
  public friends: Friend[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  // private activatedRoute: ActivatedRoute
  {
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  getFriendsByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
    return this.http.get(`${endpoint}/friends/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }
  setFriend(friend: any) {
    // sessionStorage.setItem('us',JSON.stringify(user))

    const token = sessionStorage.getItem('token') || '';

    return this.http.post(`${endpoint}/friends`,friend, {
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
  putFriend(friend: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/friends/${friend.id}`,friend, {
      headers: {
        'x-token': token,
      },
    });
  }
  delFriend(friend: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.delete(`${endpoint}/friends/${friend.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }

}
