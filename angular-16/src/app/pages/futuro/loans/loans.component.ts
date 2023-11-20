import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncomeService } from 'src/app/services/income.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/enviroments/environment.prod';
import { DialogEditLoansComponent } from './loans-components/dialog-edit-loans/dialog-edit-loans.component';
const base_url= environment.base_url

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent {
  resp:any
  imgUrl:any
  constructor( private incomeService: IncomeService,  public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private utilsService: UtilsService
    ) {}
  openDialog(row:any): void {
    sessionStorage.setItem('t',JSON.stringify(row))

    const dialogRef = this.dialog.open(DialogEditLoansComponent, {
      data: {row},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  async ngOnInit(): Promise<void> {
    try {
      this.resp = await this.getLoan();
      this.imgUrl = base_url+'/upload/loan/'
    } catch (error) {
      console.error("Error en la lectura de Loan"+error);
    }
  }
  
  async getLoan() {
    try {
      return await this.utilsService.getLoan();
    } catch (error) {
      console.error(error);
      throw error; // Re-lanzar el error para que pueda ser manejado más arriba si es necesario
    }
  }
  
  openBottomSheet(row:any): void {
    sessionStorage.setItem('t',JSON.stringify(row))
    this._bottomSheet.open(DialogEditLoansComponent);
  }
}
