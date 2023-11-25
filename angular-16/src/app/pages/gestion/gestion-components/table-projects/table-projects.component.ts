import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncomeService } from 'src/app/services/income.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/enviroments/environment.prod';
import { DialogEditFutureComponent } from 'src/app/pages/futuro/futuro-components/dialog-edit-future/dialog-edit-future.component';
import { CreateAportDialogComponent } from './create-aport-dialog/create-aport-dialog.component';

const base_url= environment.base_url

@Component({
  selector: 'app-table-projects',
  templateUrl: './table-projects.component.html',
  styleUrls: ['./table-projects.component.scss']
})
export class TableProjectsComponent {
  resp:any
  imgUrl:any
  pro:any
  constructor( private incomeService: IncomeService,  public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private utilsService: UtilsService
    ) {}
    currentIndex: number | null = null;

    setProject2(saving: any): void {
      // Lógica para establecer el índice actual al pasar el ratón por encima del botón
      this.currentIndex = this.resp.indexOf(saving);
    }
  openDialog(row:any): void {
    const dialogRef = this.dialog.open(CreateAportDialogComponent, {
      data: {row},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  async ngOnInit(): Promise<void> {
    try {
      this.pro = this.utilsService.proyecto;
      this.resp = await this.getProjects();
      this.imgUrl = base_url+'/upload/saving/'
      // Resto de la lógica que depende de this.resp
    } catch (error) {
      console.error(error);
      // Manejo de errores si es necesario
    }
  }
  
  async getSaving() {
    try {
      return await this.utilsService.getSaving();
    } catch (error) {
      console.error(error);
      throw error; // Re-lanzar el error para que pueda ser manejado más arriba si es necesario
    }
  }
  async getProjects() {
    try {
      return await this.utilsService.getProjects();
    } catch (error) {
      console.error(error);
      throw error; // Re-lanzar el error para que pueda ser manejado más arriba si es necesario
    }
  }
  openBottomSheet(row:any): void {
    sessionStorage.setItem('t',JSON.stringify(row))
    this._bottomSheet.open(DialogEditFutureComponent);
  }

  async setProject(pro:any){
    this.actualizarProyectoNuevoValor(pro)
    this.pro = this.utilsService.proyecto;
  }
  actualizarProyectoNuevoValor(nuevoValor: any): void {
    this.utilsService.proyecto = nuevoValor;
    // El código que desees ejecutar cuando cambie el valor
  }
}
