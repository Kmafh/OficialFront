import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment.prod';
import { Usuario } from '../models/usuario';
import { Project } from '../models/project';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.name, user.email, user.img, user.google, user.role, user.uid )  
    );
  }

  private transformarHospitales( resultados: any[] ): Usuario[] {
    return resultados;
  }

  private transformarMedicos( resultados: any[] ): Project[] {
    return resultados;
  }

  busquedaGlobal( termino: string ) {

    const url = `${ base_url }/todo/${ termino }`;
    return this.http.get( url, this.headers );

  }
  
  buscar( 
      tipo: 'usuarios'|'medicos'|'hospitales',
      termino: string
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => { 

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  case 'hospitales':
                    return this.transformarHospitales( resp.resultados )

                  case 'medicos':
                     return this.transformarMedicos( resp.resultados )
                
                  default:
                    return [];
                }

              })
            );

  }


}

