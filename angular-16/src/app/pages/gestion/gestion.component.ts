import { Component } from '@angular/core';
import { DialogNewGestionComponent } from './gestion-components/dialog-new-gestion/dialog-new-gestion.component';
import { IncomeService } from 'src/app/services/income.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Income } from 'src/app/models/income';
import { SalesOverviewComponent } from 'src/app/dashboard/dashboard-components/sales-overview/sales-overview.component';
import { DialogNewProComponent } from './gestion-components/dialog-new-pro/dialog-new-pro.component';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent {
  // variable para ver si muestra gestiones o proyectos
  pag:boolean = false;
  resp:any;
  //
  constructor( private incomeService: IncomeService,  public dialog: MatDialog, private utilsService: UtilsService
    ) {
      sessionStorage.setItem('pag','gestion')
      setTimeout(() => {
        this.resp = true
    }, 2500);
    }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewGestionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogPro(): void {
    const dialogRef = this.dialog.open(DialogNewProComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  async ngOnInit(): Promise<void> {
    sessionStorage.setItem('pag','futuro')

    try {
      this.resp = await this.getSaving();
      // Resto de la lógica que depende de this.resp
    } catch (error) {
      console.error(error);
      // Manejo de errores si es necesario
    }
  }
  
  async getSaving() {
    try {
      return await this.utilsService.getIncomes();
    } catch (error) {
      console.error(error);
      throw error; // Re-lanzar el error para que pueda ser manejado más arriba si es necesario
    }
  }
    
    
}
