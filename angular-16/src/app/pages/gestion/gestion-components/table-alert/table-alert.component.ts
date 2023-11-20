
import {
  AfterViewInit,
  Component,
  ViewChild,
  Inject,
  Input,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogEditGestionComponent } from '../dialog-edit-gestion/dialog-edit-gestion.component';
import { IncomeService } from '../../../../services/income.service';
import { Income } from 'src/app/models/income';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Route, Router } from '@angular/router';
import { environment } from 'src/enviroments/environment.prod';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';
import { Alert } from 'src/app/models/alert';
const base_url = environment.base_url;

export interface UserData {
  origin: string;
  cant: number;
  description: string;
  active: boolean;
  uid: string;
  tipe: string;
  createAt: string;
  time: boolean;
  oid: string;
  img: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table-alert',
  templateUrl: './table-alert.component.html',
  styleUrls: ['./table-alert.component.scss']
})
export class TableAlertComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'img',
    'text',
    'option',

  ];
  @Input() tipe: any;
  dataSource: MatTableDataSource<Alert>;
  animal!: string;
  name!: string;
  spinner:boolean = true
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  public imgUrl = '';
  public user!: Usuario;
  constructor(
    private incomeService: IncomeService,
    public dialog: MatDialog,
    private userService: UsuarioService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.user = userService.user;

    this.dataSource = new MatTableDataSource();
    this.getAlert();
    this.imgUrl = base_url + '/upload/incomes/';
    this.spinner=true;
  }
  async getAlert() {
      try {
        const resp:any = await this.utilsService.getAlert();
        (this.dataSource = new MatTableDataSource(resp.reverse()));
        this.dataSource.paginator = this.paginator;
        
    } catch (error) {
          console.error(error);
        }
      }

      ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async see(row:any) {
    row.cant = row.actual
    this.utilsService.putSeeAlert(row)
  }
}
