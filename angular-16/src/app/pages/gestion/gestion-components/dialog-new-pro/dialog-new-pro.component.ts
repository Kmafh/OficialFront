import { Component, Inject } from '@angular/core';
import { GestionComponent } from '../../gestion.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Income } from 'src/app/models/income';
import Swal from 'sweetalert2';
import { IncomeService } from 'src/app/services/income.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { environment } from 'src/enviroments/environment.prod';
import { Movement } from 'src/app/models/movement';
import { MovementService } from 'src/app/services/movement.service';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { UtilsService } from '../../../../services/utils.service';
import { Alert } from 'src/app/models/alert';

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
@Component({
  selector: 'app-dialog-new-pro',
  templateUrl: './dialog-new-pro.component.html',
  styleUrls: ['./dialog-new-pro.component.scss'],
})
export class DialogNewProComponent {
  images: any = [
    { value: 'Vivienda', url: '../../../../../assets/images/pro/casa.png' },
    {
      value: 'Mobiliario',
      url: '../../../../../assets/images/pro/refrigerador.png',
    },
    { value: 'Vehiculo', url: '../../../../../assets/images/pro/coche.png' },
    { value: 'Viaje', url: '../../../../../assets/images/pro/avion.png' },
    { value: 'Estudios', url: '../../../../../assets/images/pro/bolso.png' },
    { value: 'Otros', url: '../../../../../assets/images/pro/futbol.png' },
  ];
  img: string = '../../../../../assets/images/pro/signo.png';
  programado: boolean = false;

  foods: Food[] = [
    { value: 'income', viewValue: 'Ingreso' },
    { value: 'bill', viewValue: 'Gasto' },
  ];
  public imgUrl = environment.url_img_income + 'administration.jpg';
  user: Usuario = this.userService.user;
  //variable para ver si carga datos al inicio
  carga: boolean = false;
  public itemForm = this.fb.group({
    img: ['', [Validators.required]],
    tipe: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    description: [''],
    actual: ['', [Validators.required]],
    finishAt: [''],
    cant: [0, [Validators.required]],
  });

  firstFormGroup = this._formBuilder.group({
    img: ['', [Validators.required]],
    tipe: ['', [Validators.required]],
  });
  secondFormGroup = this._formBuilder.group({
    titulo: ['', [Validators.required]],
    description: [''],
  });
  tresFormGroup = this._formBuilder.group({
    actual: [null, [Validators.required]],
    finishAt: [''],
  });
  forFormGroup = this._formBuilder.group({
    cant: [0, [Validators.required]],
    public: [true],
  });
  isOptional = false;

  matcher = new MyErrorStateMatcher();
  activeImage: any = null;
  constructor(
    private _formBuilder: FormBuilder,
    private proService: ProjectsService,
    public dialog: MatDialog,
    public userService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private movService: MovementService,
    private utilsService: UtilsService,
    public dialogRef: MatDialogRef<GestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setItems() {
    let inco: Income = new Income();
    let pro: any = {};
    let mov: Movement = new Movement();
    pro.img = this.firstFormGroup.value.img!;
    pro.uid = this.user.uid;
    pro.tipe = this.firstFormGroup.value.tipe!;
    pro.titulo = this.secondFormGroup.value.titulo!;
    pro.description = this.secondFormGroup.value.description!;
    pro.cantObjetivo = this.tresFormGroup.value.actual!;
    pro.finishAt = this.tresFormGroup.value.finishAt!;
    pro.id=null
    this.forFormGroup.value.cant
      ? (pro.actual = this.forFormGroup.value.cant)
      : (pro.actual = 0);
      this.forFormGroup.value.cant
      ? (pro.cuota = this.forFormGroup.value.cant)
      : (pro.cuota = 0);
    if (this.tresFormGroup.valid) {
      this.onNoClick();
      this.proService.setProject(pro).subscribe(
        (resp: any) => {
          if(this.forFormGroup.value.public){
            let alert:Alert = new Alert();
            alert.uid = resp.project.uid;
            alert.oid = resp.project.id;
            alert.img = pro.img;
            alert.title = resp.project.titulo;
            alert.createAt = new Date();
            alert.visto = false;
            alert.text = "Ha creado el proyecto: "+pro.titulo ;
            this.utilsService.setAlert(alert)
          }
          if(pro.actual !== 0 ){
            let temp: any = pro
            temp.cant = temp.actual
            temp.origin = temp.titulo
            this.utilsService.setIncome(temp, resp.project, 'pro', 'Creación de Proyecto')
          }
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
            title: `Proyecto ${pro.titulo} creado con éxito.`,
          });
          this.router.navigate(['preload']);
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
  setTipe(img: any) {
    this.img = img.url;
    this.firstFormGroup.controls.img.setValue(img.url);
    this.firstFormGroup.controls.tipe.setValue(img.value);
    this.activeImage = img;
  }
  getImg() {
    return this.itemForm.value.img?.toString();
  }
  alert() {
    if (this.tresFormGroup.valid) {
      Swal.fire({
        title: '¿Programar aporte?',
        text: '¿Deseas programar un aporte mensual?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, adelante!',
        cancelButtonText: 'Mejor no',
      }).then((result) => {
        if (result.isConfirmed) {
          this.programado = true;
        }
      });
    }
  }
}
