import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { environment } from 'src/enviroments/environment.prod';
import { FuturoComponent } from '../../futuro.component';
import { SavingService } from 'src/app/services/saving.service';
import { Saving } from 'src/app/models/saving';
import { CurrencyPipe } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-new-future',
  templateUrl: './dialog-new-future.component.html',
  styleUrls: ['./dialog-new-future.component.scss']
})
export class DialogNewFutureComponent {
  foods: Food[] = [
    {value: 'expo', viewValue: 'Exporadica'},
    {value: 'prog', viewValue: 'Programada'},
  ];
  // public imgUrl = environment.url_img_savingme+"administration.jpg"
  ;
  user: Usuario = this.userService.user;
  //variable para ver si carga datos al inicio
  carga: boolean = false;
  public itemForm = this.fb.group({
    origin: ['', [Validators.required]],
    cant: [0, [Validators.required]],
    cantFinish: [0, [Validators.required]],
    description: [''],
    tipe: ['', [Validators.required]],
    uid: [this.user.uid],
    time: [false],
  });
  matcher = new MyErrorStateMatcher();
  firstFormGroup = this._formBuilder.group({
    origin: ['', [Validators.required]],
    tipe: ['', [Validators.required]],
    time: [false],
    
  });
  secondFormGroup = this._formBuilder.group({
    cant: [null, [Validators.required]],
    finishAt: [null, ],
  });
  isOptional = false;
  constructor(private savingService: SavingService,
    public dialog: MatDialog, 
    public userService: UsuarioService,
    public utilsService: UtilsService,
    private fb: FormBuilder,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FuturoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    let saving: Saving = new Saving();
    // let mov: Mov = new Mov();

    if (this.secondFormGroup.valid && this.secondFormGroup.valid) {
      saving.uid = this.itemForm.value.uid!;
      saving.cant = this.secondFormGroup.value.cant!;
      saving.origin = this.firstFormGroup.value.origin!;
      saving.finishAt = this.secondFormGroup.value.finishAt? this.secondFormGroup.controls.finishAt.value!:'';
      saving.tipe = this.firstFormGroup.value.tipe!;
      saving.tipe !== 'income'?saving.img='gastos.png':saving.img='income.png';
      
      this.savingService.setSaving(saving).subscribe(
        (resp) => {
          this.utilsService.setIncome(saving, resp,'saving','Primer aporte');
          this.onNoClick();
          this.router.navigate(['preload'])
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `Nueva hucha registrada.`
          })
          // Swal.fire({
          //   icon: 'success',
          //   title: `Nuevo ${saving.tipe}`,
          //   text: 'Creado con éxito',
          // });
          // this.onNoClick()
          // this.router.navigate(['preload'])
          
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
  setFinishAt(){
    if(this.secondFormGroup.valid){

    }
  }
  expoOrProg(){
    if(this.firstFormGroup.value.tipe === 'expo') {
      this.secondFormGroup.controls.cant.clearValidators(); 
      this.secondFormGroup.controls.cant.updateValueAndValidity();
    }
  }
}
