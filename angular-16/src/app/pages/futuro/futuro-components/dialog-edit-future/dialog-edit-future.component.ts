import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { environment } from 'src/enviroments/environment.prod';
import { FuturoComponent } from '../../futuro.component';
import { SavingService } from 'src/app/services/saving.service';
import { Saving } from 'src/app/models/saving';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TarjetComponent } from '../tarjet/tarjet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilsService } from 'src/app/services/utils.service';
import { IncomeService } from 'src/app/services/income.service';

const base_url = environment.base_url;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-edit-future',
  templateUrl: './dialog-edit-future.component.html',
  styleUrls: ['./dialog-edit-future.component.scss'],
})
export class DialogEditFutureComponent {
  imgUrl: any;
  resp: any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 90;
  width = 15;
  edit: any = '';
  @Input() porcentaje: number = 50;

  constructor(
    public dialogRef: MatDialogRef<TarjetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UsuarioService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private utilsService: UtilsService,
    private savingService: SavingService,
    private incomeService: IncomeService
  ) {
    this.imgUrl = base_url + '/upload/saving/';
  }
  foods: Food[] = [
    { value: 'savingme', viewValue: 'Ingreso' },
    { value: 'bill', viewValue: 'Gasto' },
  ];
  // public imgUrl = environment.url_img_savingme+"administration.jpg"
  user: Usuario = this.userService.user;
  //variable para ver si carga datos al inicio
  acciones: any = [
    {
      id: 1,
      name: 'Aportación',
    },
    {
      id: 2,
      name: 'Ampliar objetivo',
    },
  ];
  accion: any;
  carga: boolean = false;
  public itemForm = this.fb.group({
    uid: [this.user.uid],
  });
  matcher = new MyErrorStateMatcher();
  formTitulo = this._formBuilder.group({
    origin: [this.data.row.origin, [Validators.required]],
  });
  formCant = this._formBuilder.group({
    cant: [ [Validators.required]],
  });
  formAmp = this._formBuilder.group({
    cantFinish: [this.data.row.cantFinish, [Validators.required]],
    finishAt: [this.data.row.finishAt, [Validators.required]],
  });
  isOptional = true;

  onNoClick(): void {
    this.dialogRef.close();
  }
  putAmpl(){
    let saving: Saving = new Saving();

    if (this.formCant.valid) {
      saving = this.data.row;
      saving.cantFinish = this.formAmp.value.cantFinish!;
      saving.finishAt =  this.formAmp.value.finishAt!;
      Swal.fire({
        title: 'Estas seguro?',
        text: "Solo podrá ser devuelto en como devolución!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, adelante!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.savingService.putSaving(saving).subscribe(
            (resp) => {
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'Acción realizada con éxito',
                showConfirmButton: false,
                timer: 1500,
              });
              this.onNoClick();
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...Error en el registro',
                text: err.error.msg,
              });
            }
          );
        }
      })
      
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...Error en el registro',
        text: 'Algún parametro es erroneo',
      });
    }
  }
  putTitle() {
    let saving: Saving = new Saving();

    if (this.formTitulo.valid) {
      saving = this.data.row;
      saving.origin = this.formTitulo.value.origin!;
      this.savingService.putSaving(saving).subscribe(
        (resp) => {
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Acción realizada con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.onNoClick();
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...Error en el registro',
            text: err.error.msg,
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...Error en el registro',
        text: 'Algún parametro es erroneo',
      });
    }
  }

  putCant() {
    let saving: Saving = new Saving();

    if (this.formCant.valid) {
      saving = this.data.row;
      saving.cant = saving.cant + this.formCant.value.cant!;
      Swal.fire({
        title: 'Estas seguro?',
        text: "Solo podrá ser devuelto en como devolución!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, adelante!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.savingService.putSaving(saving).subscribe(
            (resp) => {
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'Acción realizada con éxito',
                showConfirmButton: false,
                timer: 1500,
              });
              this.onNoClick();
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...Error en el registro',
                text: err.error.msg,
              });
            }
          );
        }
      })
      
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...Error en el registro',
        text: 'Algún parametro es erroneo',
      });
    }
  }

  

}
