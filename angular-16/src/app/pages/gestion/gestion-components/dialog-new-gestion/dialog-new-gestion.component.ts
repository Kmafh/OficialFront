import { Component, Inject } from '@angular/core';
import { GestionComponent } from '../../gestion.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Income } from 'src/app/models/income';
import Swal from 'sweetalert2';
import { IncomeService } from 'src/app/services/income.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { environment } from 'src/enviroments/environment.prod';
import { Movement } from 'src/app/models/movement';
import { MovementService } from 'src/app/services/movement.service';

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
  selector: 'app-dialog-new-gestion',
  templateUrl: './dialog-new-gestion.component.html',
  styleUrls: ['./dialog-new-gestion.component.scss']
})
export class DialogNewGestionComponent {
  foods: Food[] = [
    {value: 'income', viewValue: 'Ingreso'},
    {value: 'bill', viewValue: 'Gasto'},
  ];
  public imgUrl = "../../../../../assets/images/pro/"
  ;
  user: Usuario = this.userService.user;
  //variable para ver si carga datos al inicio
  carga: boolean = false;
  public itemForm = this.fb.group({
    origin: ['', [Validators.required]],
    cant: [0, [Validators.required]],
    description: [''],
    tipe: ['', [Validators.required]],
    uid: [this.user.uid],
    time: [false],
    oid: [''],
  });
  matcher = new MyErrorStateMatcher();

  constructor(private incomeService: IncomeService,  public dialog: MatDialog, public userService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private movService: MovementService,
    public dialogRef: MatDialogRef<GestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setItems() {
    let inco: Income = new Income();
     let mov: Movement = new Movement();
    this.onNoClick()
    if (this.itemForm.valid) {
      inco.uid = this.itemForm.value.uid!;
      inco.cant = this.itemForm.value.cant!;
      inco.description = this.itemForm.value.description!;
      inco.origin = this.itemForm.value.origin!;
      inco.time = this.itemForm.value.time!;
      inco.tipe = this.itemForm.value.tipe!;
      inco.tipe === 'bill'?inco.img='gastos.png':inco.img='income.png';
      mov.cant = inco.cant;
      mov.origin = inco.origin;
      mov.img = inco.img;
      mov.tipe = inco.tipe;
      mov.uid = inco.uid;
      mov.cant = inco.cant;
      this.incomeService.setIncome(inco).subscribe(
        (resp:any) => {
          mov.oid = resp.income.id;
          this.movService.setMovement(mov).subscribe( (resp) => {
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
              title: `Creado con éxito.`
            })
            this.router.navigate(['preload'])  
          })
          
                
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

}
