import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
      })),
      state('out', style({
        transform: 'translateX(-100%)',
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out')),
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
}
