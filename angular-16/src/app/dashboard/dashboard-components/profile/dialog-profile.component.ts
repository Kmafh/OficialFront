import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { FormUpdateComponent } from 'src/app/pages/perfil/perfil-components/form-update/form-update.component';

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.scss'],
})
export class DialogProfileComponent {
  public imgUrl = '';
  user!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(
    private userService: UsuarioService,
    private _bottomSheetRef: MatBottomSheetRef<FormUpdateComponent>,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {
    this.imgUrl = userService.user.getImgUrl;
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

  subirImagen(tipo:any) {
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
          .actualizarFoto(this.imagenSubir, tipo, this.user.uid)
          .then((img) => {
            this.user.img = img;
            Swal.fire('Guardado!', 'Imagen de usuario actualizada.', 'success');
            location.reload();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
          });
      }
    });
  }
}
