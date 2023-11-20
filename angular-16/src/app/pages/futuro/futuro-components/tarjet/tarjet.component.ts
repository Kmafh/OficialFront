import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncomeService } from 'src/app/services/income.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/enviroments/environment.prod';
import { DialogNewFutureComponent } from '../dialog-new-future/dialog-new-future.component';
import { DialogEditFutureComponent } from '../dialog-edit-future/dialog-edit-future.component';
const base_url= environment.base_url

@Component({
  selector: 'app-tarjet',
  templateUrl: './tarjet.component.html',
  styleUrls: ['./tarjet.component.scss']
})
export class TarjetComponent {
  resp:any = []
  imgUrl:any
  constructor( private incomeService: IncomeService,  public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private utilsService: UtilsService
    ) {}
  openDialog(row:any): void {
    sessionStorage.setItem('t',JSON.stringify(row))
    const dialogRef = this.dialog.open(DialogEditFutureComponent, {
      data: {row},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  async ngOnInit(): Promise<void> {
    try {
      this.resp = await this.getSaving();
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
  
  openBottomSheet(row:any): void {
    sessionStorage.setItem('t',JSON.stringify(row))
    this._bottomSheet.open(DialogEditFutureComponent);
  }
}
