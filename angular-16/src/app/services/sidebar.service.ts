import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      title: 'Dashboard',
      icons: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', icons: 'mdi-mdi-image', url: '/dashboard' },
        { title: 'Barra progreso', icons: 'mdi-mdi-image', url: 'progress' },
        { title: 'Gráfica', icons: 'mdi-mdi-image', url: 'graphic' },
        { title: 'Rxjs', icons: 'mdi-mdi-image', url: 'rxjs' },
      ],
    },
    {
      title: 'Mantenimiento',
      icons: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', icons: 'mdi-mdi-image', url: 'usuarios' },
        { title: 'Médicos', icons: 'mdi-mdi-image', url: 'medicos' },
        { title: 'Hospitales', icons: 'mdi-mdi-image', url: 'hospitales' },
      ],
    },
  ];
  constructor() {}
}
