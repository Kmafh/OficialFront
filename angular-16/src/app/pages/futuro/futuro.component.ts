import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncomeService } from 'src/app/services/income.service';
import { DialogNewFutureComponent } from './futuro-components/dialog-new-future/dialog-new-future.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/enviroments/environment.prod';
import { DialogNewLoansComponent } from './loans/loans-components/dialog-new-loans/dialog-new-loans.component';
const base_url= environment.base_url

@Component({
  selector: 'app-futuro',
  templateUrl: './futuro.component.html',
  styleUrls: ['./futuro.component.scss'],
  
})
export class FuturoComponent implements OnInit {
  resp:any
  imgUrl:any
  constructor( private incomeService: IncomeService,  public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private utilsService: UtilsService
    ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewFutureComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogLoans(): void {
    const dialogRef = this.dialog.open(DialogNewLoansComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async ngOnInit(): Promise<void> {
    sessionStorage.setItem('pag','futuro')

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
  
  openBottomSheet(): void {
    this._bottomSheet.open(DialogNewFutureComponent);
  }
}
