import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { environment } from 'src/enviroments/environment.prod';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan';
import { LoansComponent } from '../../loans.component';
import { IncomeService } from 'src/app/services/income.service';
import { Income } from 'src/app/models/income';
import { Movement } from 'src/app/models/movement';
import { MovementService } from 'src/app/services/movement.service';
import { UtilsService } from 'src/app/services/utils.service';
const base_url= environment.base_url

/** Error when invalid control is dirty, touched, or submitted. */
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
interface Accion {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-new-loans',
  templateUrl: './dialog-new-loans.component.html',
  styleUrls: ['./dialog-new-loans.component.scss'],
})
export class DialogNewLoansComponent {
  foods: Food[] = [
    { value: 'loan', viewValue: 'Prestamo Personal' },
    { value: 'hipo', viewValue: 'Hipoteca' },
  ];
  accion: Accion[] = [
    { value: '1', viewValue: 'Solicitud nueva (cuota aut.)' },
    { value: '2', viewValue: 'Solicitud nueva (F.liquidación aut.)' },
    { value: '3', viewValue: 'Añadir existente (manual)' },
  ];
  // public imgUrl = environment.url_img_loanme+"administration.jpg"
  user: Usuario = this.userService.user;
  //variable para ver si carga datos al inicio
  carga: boolean = false;
  public itemForm = this._formBuilder.group({
    origin: ['', [Validators.required]],
    tipe: ['', [Validators.required]],
    time: [false],
    accion: [null, [Validators.required]],
    uid: [this.user.uid],
    cuota: [],
    cantFinish: [0, [Validators.required]],
    finishAt: [''],
    recibos: [0],
    interes: ['', [Validators.required]],
    description: [''],
  });
  matcher = new MyErrorStateMatcher();
  firstFormGroup = this._formBuilder.group({
    origin: ['', [Validators.required]],
    tipe: ['', [Validators.required]],
    time: [false],
    accion: [null, [Validators.required]],
    uid: [this.user.uid],

  });
  secondFormGroup = this._formBuilder.group({
    cuota: [],
    cantFinish: [0, [Validators.required]],
    finishAt: [''],
  });
  threeFormGroup = this._formBuilder.group({
    recibos: [0],
    interes: ['', [Validators.required]],
    description: [''],
  });
  isOptional = false;
  constructor(
    private loanService: LoanService,
    private incomeService: IncomeService,
    private movService: MovementService,
    private utilsService: UtilsService,

    public dialog: MatDialog,
    public userService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.disabledOrEnabled();
  }

  resultAlgoritmo() {
    let values:any = {
      ...this.firstFormGroup.value, // Obtiene los valores de firstFormGroup
      ...this.secondFormGroup.value, // Combina los valores de secondFormGroup
      ...this.threeFormGroup.value, // Combina los valores de threeFormGroup
    };
    
    let cuota: any;
    const mes = this.getMonthsDifference(
      new Date(),
      new Date(values.finishAt!)
    );
    const por = this.getPorcent(
      Number(values.cantFinish),
      Number(values.interes)
    );
    if (values.accion! === '1') {
        values.cantFinish! = values.cantFinish! + por
        mes >= 2
        ? (cuota = (values.cantFinish! + por) / mes)
        : (cuota = values.cantFinish! + por);
      this.secondFormGroup.get('cuota')?.enable();
      values.cuota = cuota;
      values.recibos = Math.round(mes);

    } else if (values.accion! === '2' || values.accion! === '3') {
      values.cantFinish! = values.cantFinish! + por
      this.getDateSimulated(values);
      values.finishAt = this.itemForm.value.finishAt
    }
    this.itemForm.setValue(values)
  }

  getDateSimulated(values: any) {
    const mes =
    (values.cantFinish) /
      values.cuota;
    const fechaFinal = new Date();
    fechaFinal.setMonth(fechaFinal.getMonth() + mes)
    const dateEnd:any = fechaFinal
    this.itemForm.get('finishAt')?.setValue(dateEnd);
    this.itemForm.get('recibos')?.setValue(mes);
  }
  getMonthsDifference(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }
  getPorcent(total: number, percentage: number): number {
    return (total * percentage) / 100;
  }
  disabledOrEnabled() {
    this.firstFormGroup.get('accion')?.valueChanges.subscribe((newValue) => {
      if (newValue === '1') {
        this.secondFormGroup.get('cuota')?.disable();
        this.secondFormGroup
          .get('finishAt')
          ?.setValidators([Validators.required]);
        this.secondFormGroup.get('finishAt')?.enable();
      } else if (newValue === '2' || newValue === '3' ) {
        this.secondFormGroup.get('finishAt')?.disable();
        this.secondFormGroup.get('cuota')?.setValidators([Validators.required]);
        this.secondFormGroup.get('cuota')?.enable();
      }
      // Aquí puedes realizar cualquier acción que necesites cuando cambie el valor de 'accion'
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    let loan: Loan = new Loan();
    let values:any = {
      ...this.firstFormGroup.value, // Obtiene los valores de firstFormGroup
      ...this.secondFormGroup.value, // Combina los valores de secondFormGroup
      ...this.threeFormGroup.value, // Combina los valores de threeFormGroup
    };

    if (
      this.secondFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.threeFormGroup.valid
    ) {
      loan.uid = this.itemForm.value.uid!;
      loan.origin = this.itemForm.value.origin!;
      loan.cantFinish = Math.round(this.itemForm.value.cantFinish!);
      loan.cant = Math.round(this.itemForm.value.cuota!);
      loan.finishAt = new Date(this.itemForm.controls.finishAt.value!);
      loan.recibos = this.itemForm.value.recibos!;
      loan.interes = this.itemForm.value.interes!;
      loan.description = this.itemForm.value.description!;
      loan.tipe = this.itemForm.value.tipe!;
      loan.recibosPendientes = loan.recibos;
      loan.cantPendiente = loan.cantFinish
      loan.img = 'card.png';

      Swal.fire({
        title: '¿Estas seguro?',
        text: 'No todos los datos son modificables posteriormente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#04b381',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, hazlo!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.loanService.setLoan(loan).subscribe(
            (resp:any) => {
              
              if(values.accion !== "3"){
                this.setIncome(loan, resp,'income','Primera cuota')
              } else {
                this.setIncome(loan, resp,'bill','Primera cuota')
              }
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
                title: `Procesado correctamente.`
              })
              
              // location.reload();
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
      });
      this.onNoClick();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...Error en el registro',
        text: 'Algún parametro es erroneo',
      });
    }
  }
  async setIncome(loan:any, resp:any, tipe:any, title:string){
    await this.utilsService.setIncome(loan, resp, tipe, title)
    this.onNoClick();
    this.router.navigate(['preload'])
  }

  

}
