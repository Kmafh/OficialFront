import { Component, OnInit } from '@angular/core';
import { Contact, contacts } from './contact-data';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { NgFor } from '@angular/common';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Friend } from '../../../models/friend';
import { environment } from 'src/enviroments/environment.prod';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuariosComponent } from './components/dialog-usuarios/dialog-usuarios.component';
const base_url= environment.base_url

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [DemoMaterialModule, NgFor],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  friends: any[] = [];
  friend: any;
  imgUser = base_url+'/upload/usuarios/';
  constructor(
    private userService: UsuarioService,
    private utilsService: UtilsService,
    public dialog: MatDialog,

  ) {}

  
  async ngOnInit(): Promise<void> {
    await this.getFriends();
  }

  async getFriends() {
    try {
      const resp = await this.utilsService.getFriends();
      const users: any[] = [];

      for (const friend of resp) {
        users.push(await this.utilsService.getUserByUID(friend.fid));
      }

      this.friends = users; // Asigna la lista de amigos después de obtenerlos.
    } catch (error) {
      console.error('Error al obtener amigos', error);
    }
  }


  openDialog(row?: any): void {
    let dialogRef ;
    if (row) {
      dialogRef = this.dialog.open(DialogUsuariosComponent, {
        data: { row },
      });
    } else {
      dialogRef = this.dialog.open(DialogUsuariosComponent);
    }
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

