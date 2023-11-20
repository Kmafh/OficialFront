import { Component, Inject, Input } from '@angular/core';
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
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { environment } from 'src/enviroments/environment.prod';
import { LoansComponent } from '../../loans.component';
import { IncomeService } from 'src/app/services/income.service';
import { Income } from 'src/app/models/income';
import { Loan } from 'src/app/models/loan';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilsService } from 'src/app/services/utils.service';
import { LoanService } from 'src/app/services/loan.service';
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
  selector: 'app-dialog-edit-loans',
  templateUrl: './dialog-edit-loans.component.html',
  styleUrls: ['./dialog-edit-loans.component.scss']
})
export class DialogEditLoansComponent {
  imgUrl: any;
  resp: any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 90;
  width = 15;
  edit: any = '';
  @Input() porcentaje: number = 50;
  //PROPIEDA PARA EL MENU DESPLEGABLE DE MOVIMIENTOS
  panelOpenState = false;
  constructor(
    public dialogRef: MatDialogRef<LoansComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UsuarioService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private utilsService: UtilsService,
    private loanService: LoanService,
    private incomeService: IncomeService
  ) {
    this.imgUrl = base_url + '/upload/loan/';
    this.getPorcentaje()
  }
  foods: Food[] = [
    { value: 'loanme', viewValue: 'Ingreso' },
    { value: 'bill', viewValue: 'Gasto' },
  ];
  // public imgUrl = environment.url_img_loanme+"administration.jpg"
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
    tipe: [ [Validators.required]],
  });
  formAmp = this._formBuilder.group({
    cantFinish: [this.data.row.cantFinish, [Validators.required]],
    finishAt: [this.data.row.finishAt, [Validators.required]],
  });
  isOptional = true;

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPorcentaje(){
    this.porcentaje = (this.data.row.cant / this.data.row.cantFinish ) * 100
  }
  putAmpl(){
    let loan: Loan = new Loan();

    if (this.formCant.valid) {
      loan = this.data.row;
      loan.cantFinish = this.formAmp.value.cantFinish!;
      loan.finishAt =  this.formAmp.value.finishAt!;

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
          this.loanService.putLoan(loan).subscribe(
            async (resp:any) => {
              await this.utilsService.setMovement(loan, resp, 'bill', 'aporte')
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
      
    //   Swal.fire({
    //     title: 'Estas seguro?',
    //     text: "Solo podrá ser devuelto en como devolución!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Si, adelante!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.loanService.putLoan(loan).subscribe(
    //         (resp:any) => {
    //           Swal.fire({
    //             position: 'bottom',
    //             icon: 'success',
    //             title: 'Acción realizada con éxito',
    //             showConfirmButton: false,
    //             timer: 1500,
    //           });
    //           this.onNoClick();
    //         },
    //         (err:any) => {
    //           Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...Error en el registro',
    //             text: err.error.msg,
    //           });
    //         }
    //       );
    //     }
    //   })
      
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...Error en el registro',
    //     text: 'Algún parametro es erroneo',
    //   });
    // }
  }
  putTitle() {
    let loah: Loan = new Loan();

    if (this.formTitulo.valid) {
      loah = this.data.row;
      loah.origin = this.formTitulo.value.origin!;
      this.loanService.putLoan(loah).subscribe(
        (resp:any) => {
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Acción realizada con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.onNoClick();
        },
        (err:any) => {
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
    let loan: Loan = new Loan();

    if (this.formCant.valid) {

      loan = this.data.row;
      if(this.formCant.value.tipe! === '1'){
        loan = this.substracCant(loan,this.formCant.value.cant!)
      }else if(this.formCant.value.tipe! === '2'){
        
      }

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
          this.loanService.putLoan(loan).subscribe(
            (resp:any) => {
              this.setIncome(loan, resp.loan.id, "bill", 'Aporte')
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: 'Acción realizada con éxito',
                showConfirmButton: false,
                timer: 1500,
              });
              this.onNoClick();
            },
            (err:any) => {
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

  substracCant(loan:Loan,cant:any) {
    let today:Date = new Date()
    let finish:Date = new Date(loan.finishAt)
    let diferent = this.getMonthsDifference(today, finish)
    loan.cantPendiente = Number(loan.cantPendiente) - Number(cant);
    loan.cant = Number(loan.cantPendiente) / diferent
    return loan;
  }
  
  getMonthsDifference(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }
  async setIncome(loan:Loan, resp:any, tipe:any, title:string){
    loan.cant = this.formCant.value.cant!;
    await this.utilsService.setIncome(loan, resp, tipe, title)
    this.onNoClick();
    this.router.navigate(['preload'])
  }
}
