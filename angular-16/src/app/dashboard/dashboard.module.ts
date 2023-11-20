import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DialogProfileComponent } from './dashboard-components/profile/dialog-profile.component';
import { CurrencyPipe } from '@angular/common';
import { SpinnerComponent } from './dashboard-components/top-dash/top-components/spinner/spinner.component';
import { DialogUsuariosComponent } from './dashboard-components/contacts/components/dialog-usuarios/dialog-usuarios.component';
import { DialogProfileFondoComponent } from './dashboard-components/profile/dialog-profile-fondo.component';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(DashboardRoutes),
    DashboardComponent,
    CurrencyPipe,
    SpinnerComponent,
  ],
  exports: [
    SpinnerComponent
  ],
  declarations: [
    DialogProfileComponent,
    DialogUsuariosComponent,
    DialogProfileFondoComponent,
  ]
})
export class DashboardModule { }
