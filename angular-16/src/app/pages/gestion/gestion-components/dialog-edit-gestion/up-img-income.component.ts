import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/dashboard/dashboard-components/profile/profile.component';
import { Income } from 'src/app/models/income';
import { Usuario } from 'src/app/models/usuario';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-up-img-income',
  templateUrl: './up-img-income.component.html'
})
export class UpImgIncomeComponent {
  public imgUrl = '';
  user!: Usuario;
  income!: Income;
  public imagenSubir!: File;
  public imgTemp: any = null;
  incomeId:any
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor(
    private userService: UsuarioService,
    private _bottomSheetRef: MatBottomSheetRef<ProfileComponent>,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {
    this.incomeId = sessionStorage.getItem('time:')
    console.table(this.data)
    this.user = userService.user;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Siempre podrás volver a cambiarla',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#04b381',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, hazlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUploadService
          .actualizarFoto(this.imagenSubir, 'incomes', this.incomeId)
          .then((img) => {
            this.imgUrl = img;
            Swal.fire('Guardado!', 'Imagen de usuario actualizada.', 'success');
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
          });
      }
    });
  }
}
