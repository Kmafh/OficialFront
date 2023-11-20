
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthModule } from './auth/auth.module';
import { BreadcrumbsComponent } from './layouts/full/breadcrumbs/breadcrumbs.component';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './index/components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarruselComponent } from './index/components/carrusel/carrusel.component';
import { DialogInfoComponent } from './index/components/dialog-info/dialog-info.component';
import { ModalheadComponent } from './layouts/full/header/modalhead/modalhead.component';
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    BreadcrumbsComponent,
    IndexComponent,
    MenuComponent,
    CarruselComponent,
    DialogInfoComponent,
    ModalheadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent,
    PagesModule,
    CommonModule,
    RouterModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
