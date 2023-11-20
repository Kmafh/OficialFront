import { Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogProfileComponent } from './dialog-profile.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DemoMaterialModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private usuarioSubscription: Subscription;

  public imgUrl = '';
  public user!: Usuario;
  resp:any
  cantFinnish:any
  cantIng:number = 0;
  cantGast:number = 0;
  balance:number = 0;
  cantAhor: number = 0;
  public fondoUrl = "";

  constructor(
    private userService: UsuarioService,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private utilsService: UtilsService
  ) {
    this.user = userService.user
    this.imgUrl = this.user.getImgUrl;
    this.fondoUrl = this.user.getFondoUrl;
    this.usuarioSubscription = this.userService.getUserObservable().subscribe((nuevoUsuario) => {
      this.user = nuevoUsuario;
      this.imgUrl = userService.user.getImgUrl;
      this.fondoUrl = userService.user.getFondoUrl;
    });
  }
  routerProfile() {
    this.router.navigate(['profile'])
  }
  openBottomSheet(): void {
    this._bottomSheet.open(DialogProfileComponent);
  }
  async ngOnInit(): Promise<void> {
    try {
      this.resp = await this.getSaving();
      this.cantFinnish = this.resp[0].saving.length
      this.getIncomes();
      // Resto de la lógica que depende de this.resp
    } catch (error) {
      console.error(error);
      // Manejo de errores si es necesario
    }
  }
  async getIncomes() {
    try {
      const today = new Date()
      const resp = await this.utilsService.getIncomesMes(today.getMonth());
      this.cantIng = resp[1];
      this.cantGast = resp[2];
      this.cantAhor = resp[3];
      this.balance = this.cantIng - this.cantGast - this.cantAhor;
    } catch (error) {
      console.error(error);
    }
  }
  
  async getSaving() {
    try {
      return await this.utilsService.getSaving();
    } catch (error) {
      console.error(error);
      throw error; // Re-lanzar el error para que pueda ser manejado más arriba si es necesario
    }
  }
}
