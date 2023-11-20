import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableGestionComponent,   } from '../table-gestion/table-gestion.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UpImgIncomeComponent } from './up-img-income.component';
import { environment } from 'src/enviroments/environment.prod';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-edit-gestion',
  templateUrl: './dialog-edit-gestion.component.html',
  styleUrls: ['./dialog-edit-gestion.component.scss']
})
export class DialogEditGestionComponent {

  form = this.fb.group({
    origin:[this.data.row.origin,[Validators.required]],
    cant:[this.data.row.cant,[Validators.required]],
  })
  public imgUrl = environment.url_img_income+this.data.row.img;
  public user!:Usuario
  public income!:Income
  constructor(
    public dialogRef: MatDialogRef<TableGestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,private userService: UsuarioService,
     private router: Router,
     private _bottomSheet: MatBottomSheet,
     private incomeService: IncomeService){
      this.user = userService.user
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }
  openBottomSheet(): void {
          sessionStorage.setItem("time:",this.data.row.id)
    this._bottomSheet.open(UpImgIncomeComponent, {
      data: this.data
    });
  }
 
  update() {
    this.income = this.data.row
    this.income.origin = this.form.value.origin
    this.income.cant = this.form.value.cant
    this.incomeService.putIncome(this.income).subscribe( resp => {
      this.onNoClick();
      Swal.fire('Actualizado!', 'Información actualizada.', 'success');
      
    })
  }
  deleteIncome() {
    let income!:Income
    income = this.data.row
    income.active = false
    this.incomeService.putIncome(income).subscribe( resp => {
      this.onNoClick();
      Swal.fire('Desactivado!', 'Información actualizada.', 'success');

      setTimeout(() => {
        location.reload();
    }, 1000);
    })
  }
}
