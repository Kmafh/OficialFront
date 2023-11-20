import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { DialogProfileFondoComponent } from 'src/app/dashboard/dashboard-components/profile/dialog-profile-fondo.component';
import { DialogProfileComponent } from 'src/app/dashboard/dashboard-components/profile/dialog-profile.component';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/enviroments/environment.prod';
import Swal from 'sweetalert2';

const endpoint = environment.base_url
@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.scss']
})
export class FormUpdateComponent {
  public user!:Usuario;
  form: FormGroup;
  
  constructor(private userService: UsuarioService, fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    ){
    this.user = userService.user
    this.form = fb.group({
      name:[this.user.name,[Validators.required]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      role:[this.user.role,[Validators.required]],
    });
    this.getForm(this.form)
    
    
  }
  openBottomSheet(): void {
    this._bottomSheet.open(DialogProfileComponent);
  }
  openBottomSheet2(): void {
    this._bottomSheet.open(DialogProfileFondoComponent);
  }
  getForm(form: FormGroup) {
    form.get('role')!.valueChanges.subscribe(val => {
      if( val !== this.user.role ) {
          switch(val) {
            case 'USER_ROLE':
              Swal.fire({
                title: 'Estas segur@?',
                text: "Volverías a ser usuario normal!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#209287',
                cancelButtonColor: '#e91e63',
                confirmButtonText: 'Yes, adelante!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Hecho!',
                    'Volverías a ser usuario .',
                    'success'
                  )
                } else {
                  this.form.get('role')?.setValue(this.user.role)
                }
              })
              break;
            
            case 'ADMIN_ROLE':
              Swal.fire({
                title: 'Estas segur@?',
                text: "Deberas pagar un pastizal!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#209287',
                cancelButtonColor: '#e91e63',
                confirmButtonText: 'Si, adelante!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Hecho!',
                    'Gracias señoría.',
                    'success'
                  )
                } else {
                  this.form.get('role')?.setValue(this.user.role)
                }
              })
              break;
          }
      }
  });
  }
  update() {

    const user = this.user;
    user.name = this.form.value.name
    user.role = this.form.value.role
    return this.userService.updateUser(endpoint+'/usuarios/'+this.user.uid ,user)
    .subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Información actualizada',
      })

    },
      (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg+' '+err.error.errors.name.msg ,
      })})
    
  }
}
