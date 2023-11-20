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
  selector: 'app-table-gestion',
  templateUrl: './table-gestion.component.html',
  styleUrls: ['./table-gestion.component.scss'],
})
export class TableGestionComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'img',
    'origin',
    'tipe',
    'createAt',
    'cant',
    'time',
  ];
  @Input() tipe: any;
  dataSource: MatTableDataSource<Income>;
  animal!: string;
  name!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  incomes: Income[] = [];
  incomesFilter: Income[] = [];
  totalIncome: number = 0;
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
    this.getIncomes();
    this.imgUrl = base_url + '/upload/incomes/';
  }
  async getIncomes() {
    try {
      const today = new Date();
      const resp = await this.utilsService.getIncomesMes(today.getMonth());
      resp[0]?.forEach((income:any) => {
        if (income.active! === true) {
          if (income.tipe === 'income' && this.tipe === 'income') {
            this.incomesFilter.push(income);
            this.totalIncome++;
          } else if (income.tipe === 'bill' && this.tipe === 'bill') {
            this.incomesFilter.push(income);
            this.totalIncome++;
          } else {
            this.incomesFilter.push(income);
            this.totalIncome++;
          }
        }
      }),
        (this.dataSource = new MatTableDataSource(this.incomesFilter));
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
  openDialog(row: any): void {
    if (!row.oid) {
      const dialogRef = this.dialog.open(DialogEditGestionComponent, {
        data: { row },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    } 
  }
}
