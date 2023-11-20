import {AfterViewInit, Component, Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MovementService } from 'src/app/services/movement.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/enviroments/environment.prod';
import { Movement } from 'src/app/models/movement';
import { Project } from 'src/app/models/project';
const base_url = environment.base_url;

export interface UserData {
  uid: string ;
  oid: string ;
  cant: Number ;
  tipe: string ;
  createAt: string;
  origin: string;
  img: string;
}

@Component({
  selector: 'app-table-movements',
  
  templateUrl: './table-movements.component.html',
  styleUrls: ['./table-movements.component.scss']
})
export class TableMovementsComponent implements OnChanges {
  displayedColumns: string[] = ['origin', 'tipo',  'cant',  'createAt'];
  dataSource: MatTableDataSource<UserData>;
  public user!: Usuario;
  public imgUrl:any = base_url + '/upload/incomes/';;
  movs:Movement[] = [] ;
  pro:any;
  @Input() oid:any = ''
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private movsService: MovementService,
    private userService: UsuarioService,
    private router: Router,
    private utilsService: UtilsService
    ) {
    // Create 100 users
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.user = userService.user;
    this.getMovs(this.oid)
    this.dataSource = new MatTableDataSource();
    this.utilsService.proyecto ?this.pro = this.utilsService.proyecto:null;
    this.utilsService.proyecto ?this.getMovs(this.pro.oid):null;
  }
  ngOnChanges(changes: SimpleChanges) {
    if ('oid' in changes) {
      this.getMovs(changes['oid'].currentValue);
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
  async getMovs(oid:any) {
    try {
      const today = new Date();
      const resp = await this.utilsService.getMovementMes(today.getMonth(), oid);
       this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error(error);
    }
  }
}
