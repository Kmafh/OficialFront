import { Component } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('panelTransition', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })),
      state('*', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => void', animate('0.5s ease-in-out')),
      transition('void => *', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class IndexComponent {
  showMenu : boolean = false;
  public isHovered: boolean = false;

  panel:any = '';
  constructor(public dialog: MatDialog) {}


  toggleHover() {
    this.isHovered = !this.isHovered;
  }
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
  setPanel(item:string) {
    this.panel = item 
  }
  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  
}