import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { MaterialComponentsModule } from '../material-component/material.module';
import { ProfileComponent } from '../dashboard/dashboard-components/profile/profile.component';
import { FormUpdateComponent } from './perfil/perfil-components/form-update/form-update.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionComponent } from './gestion/gestion.component';
import { TableGestionComponent } from './gestion/gestion-components/table-gestion/table-gestion.component';
import { OurVisiterComponent } from '../dashboard/dashboard-components/our-visiter/our-visiter.component';
import { DialogEditGestionComponent } from './gestion/gestion-components/dialog-edit-gestion/dialog-edit-gestion.component';
import { DialogNewGestionComponent } from './gestion/gestion-components/dialog-new-gestion/dialog-new-gestion.component';
import { UpImgIncomeComponent } from './gestion/gestion-components/dialog-edit-gestion/up-img-income.component';
import { FuturoComponent } from './futuro/futuro.component';
import { SalesOverviewComponent } from '../dashboard/dashboard-components/sales-overview/sales-overview.component';
import { TableFutureComponent } from './futuro/futuro-components/table-future/table-future.component';
import { DialogEditFutureComponent } from './futuro/futuro-components/dialog-edit-future/dialog-edit-future.component';
import { DialogNewFutureComponent } from './futuro/futuro-components/dialog-new-future/dialog-new-future.component';
import { TopDashComponent } from '../dashboard/dashboard-components/top-dash/top-dash.component';
import { TarjetComponent } from './futuro/futuro-components/tarjet/tarjet.component';
import { LoansComponent } from './futuro/loans/loans.component';
import { DialogNewLoansComponent } from './futuro/loans/loans-components/dialog-new-loans/dialog-new-loans.component';
import { DialogEditLoansComponent } from './futuro/loans/loans-components/dialog-edit-loans/dialog-edit-loans.component';
import { TarjetLoansComponent } from './futuro/loans/loans-components/tarjet-loans/tarjet-loans.component';
import { PreloadComponent } from './preload/preload.component';
import { TableMovementsComponent } from './gestion/gestion-components/table-movements/table-movements.component';
import { TableProjectsComponent } from './gestion/gestion-components/table-projects/table-projects.component';
import { DialogNewProComponent } from './gestion/gestion-components/dialog-new-pro/dialog-new-pro.component';
import { GraficoProComponent } from './gestion/gestion-components/grafico-pro/grafico-pro.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableAlertComponent } from './gestion/gestion-components/table-alert/table-alert.component';
import { CreateAportDialogComponent } from './gestion/gestion-components/table-projects/create-aport-dialog/create-aport-dialog.component';



@NgModule({
  declarations: [
    PerfilComponent,
    FormUpdateComponent,
    GestionComponent,
    TableGestionComponent,
    DialogEditGestionComponent,
    DialogNewGestionComponent,
    UpImgIncomeComponent,
    FuturoComponent,
    TableFutureComponent,
    DialogEditFutureComponent,
    DialogNewFutureComponent,
    TarjetComponent,
    LoansComponent,
    DialogNewLoansComponent,
    DialogEditLoansComponent,
    TarjetLoansComponent,
    PreloadComponent,
    TableMovementsComponent,
    TableProjectsComponent,
    DialogNewProComponent,
    GraficoProComponent,
    TableAlertComponent,
    CreateAportDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ProfileComponent,
    DemoMaterialModule,
    ReactiveFormsModule ,
    OurVisiterComponent,
    SalesOverviewComponent,
    FormsModule,
    TopDashComponent,
    NgApexchartsModule, 
  ],
  exports: [
    TableAlertComponent,
    TableMovementsComponent
  ]
})
export class PagesModule { }
