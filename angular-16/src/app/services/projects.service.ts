import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { Project } from '../models/project';
import { UsuarioService } from './usuario.service';
const endpoint = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private usuarioSubscription: Subscription;

  public usuario: Usuario;
  public project!: Project;
  public projects: Project[] = []

  constructor(private usuarioService: UsuarioService, private http: HttpClient) // private router: Router,
  {
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
  }

  getProjectsByUID() {
    const token = sessionStorage.getItem('token') || '';
    this.usuario = this.usuarioService.user
    this.usuarioSubscription = this.usuarioService.getUserObservable().subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    });
    return this.http.get(`${endpoint}/projects/${this.usuario.uid}`, {
      headers: {
        'x-token': token,
      },
    });
  }
  
  setProject(project: any) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.post(`${endpoint}/projects`,project, {
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

  putProject(project: any) {
    const token = sessionStorage.getItem('token') || '';

    return this.http.put(`${endpoint}/projects/${project.id}`,project, {
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

  delProject(project: any) {
    const token = sessionStorage.getItem('token') || '';
    return this.http.delete(`${endpoint}/projects/${project.id}`, {
      headers: {
        'x-token': token,
      },
    });
  }
}
