import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialComponentsModule } from '../material-component/material.module';
import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { ButtonsComponent } from '../material-component/buttons/buttons.component';
import { GridComponent } from '../material-component/grid/grid.component';
import { ListsComponent } from '../material-component/lists/lists.component';
import { MenuComponent } from '../material-component/menu/menu.component';
import { TabsComponent } from '../material-component/tabs/tabs.component';
import { StepperComponent } from '../material-component/stepper/stepper.component';
import { ExpansionComponent } from '../material-component/expansion/expansion.component';
import { ChipsComponent } from '../material-component/chips/chips.component';
import { ToolbarComponent } from '../material-component/toolbar/toolbar.component';
import { ProgressSnipperComponent } from '../material-component/progress-snipper/progress-snipper.component';
import { ProgressComponent } from '../material-component/progress/progress.component';
import { DialogComponent } from '../material-component/dialog/dialog.component';
import { TooltipComponent } from '@angular/material/tooltip';
import { SnackbarComponent } from '../material-component/snackbar/snackbar.component';
import { SliderComponent } from '../material-component/slider/slider.component';
import { SlideToggleComponent } from '../material-component/slide-toggle/slide-toggle.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    MaterialComponentsModule,
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent
  ]
})
export class AuthModule { }
