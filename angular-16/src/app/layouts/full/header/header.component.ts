import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { DialogNewGestionComponent } from 'src/app/pages/gestion/gestion-components/dialog-new-gestion/dialog-new-gestion.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ModalheadComponent } from './modalhead/modalhead.component';
import { Alert } from 'src/app/models/alert';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent implements OnInit{
  public imgUrl = '';
  public user!: Usuario;
  public cont: any = 0;

  constructor(
    private userService: UsuarioService,
    private utilsService: UtilsService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.imgUrl = userService.user.getImgUrl;
    this.user = userService.user;
    
  }
  async ngOnInit(): Promise<void> {
    this.cont = await this.contAlert()
    console.log(this.cont)
  }


  async contAlert() {
  let badga:any;
  let badgb:any[] = [];

    badga = await this.getAlert()
    badga.forEach((element:any) => {
      if(!element.visto){
        badgb.push(element)
      }
    });
    return badgb.length
  }
  async getAlert() {

  return await this.utilsService.getAlert()
}

  
  logout() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Siempre serás bienvenido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#04b381',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, hasta otra!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        this.router.navigate(['']);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: `Que pase buen día.`,
        });

        // location.reload();
      }
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewGestionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogAlert(): void {
    this.cont = 0;
    const dialogRef = this.dialog.open(ModalheadComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
