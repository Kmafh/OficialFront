import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  showMenu : boolean = false;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  
  openDialogInfo(data:any): void {
    const dialogRef = this.dialog.open(DialogInfoComponent,{
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  
  mostrarDiv() {
    var div = document.querySelector('.mi-div');
    div!.classList.toggle('mostrar');
  }
}
