import { Component, Inject, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ContactsComponent } from '../../contacts.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'src/app/models/usuario';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/enviroments/environment.prod';
import Swal from 'sweetalert2';
const base_url = environment.base_url;

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrls: ['./dialog-usuarios.component.scss']
})
export class DialogUsuariosComponent {
  update!:boolean;
  value:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,private userService: UsuarioService,
     private router: Router,
     private _bottomSheet: MatBottomSheet,
    private utilsService: UtilsService,
    ){
      data?this.update=true:this.update=false
      this.getUser()
  }

  displayedColumns: string[] = [
    'img',
    'origin',
    'email',
  ];
  @Input() tipe: any;
  dataSource!: MatTableDataSource<Usuario>;
  animal!: string;
  name!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  usuarios: Usuario[] = [];
  imgUser = base_url+'/upload/usuarios/';
  imgFondo = base_url+'/upload/fondo/';

  public user!: Usuario;
  public yo = this.userService.user.uid
  async getUser() {
    try {
      const resp = await this.utilsService.getUsuarios();
      const usuarios = resp.usuarios || [];
  
      const usersToAdd: any[] = [];
  
      await Promise.all(usuarios.map(async (user: any) => {
        const isFriend:any = await this.isFriend(user.uid);
        if (!isFriend) {
          usersToAdd.push(user);
        }
      }));
  
      this.usuarios = [...this.usuarios, ...usersToAdd];
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error(error);
    }
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterString(event: any) {
    const filterValue = event;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async add(uid: any) {
    try {
      const resp = await this.utilsService.setFriend(uid);
    this.onNoClick()
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: `Nuevo usuario a seguir.`
      }),
      this.router.navigate(['/preload'])
      // Realiza alguna acción después de agregar un amigo, si es necesario.
    } catch (error) {
      console.error('Error al agregar amigo', error);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  consola(text:any){
    console.log(text)
  }
 
  async isFriend(fid:any) {
    try {
      this.value = await this.utilsService.isFriend(fid);
    } catch (error) {
      console.error('Error al obtener amigos', error);
    }
  }
}
