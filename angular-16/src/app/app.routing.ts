import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './dashboard/dashboard-components/profile/profile.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { FuturoComponent } from './pages/futuro/futuro.component';
import { PreloadComponent } from './pages/preload/preload.component';
import { IndexComponent } from './index/index.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./material-component/material.module').then(
            (m) => m.MaterialComponentsModule
          ),
      },
      { path: 'gestion', component: GestionComponent,data:{title:'Día a día', subTitle: ''} },
      { path: 'prestamos', component: FuturoComponent,data:{title:'Futuro', subTitle: ''} },
      
      { path: 'profile', component: PerfilComponent,data:{title:'Perfil', subTitle: ''} },
      { path: 'preload', component: PreloadComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
          data:{title:'Dashboard'} 
      },
    ],
  },
  { path: 'index', component: IndexComponent, loadChildren: () =>
  import('./material-component/material.module').then(
    (m) => m.MaterialComponentsModule
  ), },
  

];
