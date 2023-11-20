import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableProjectsComponent } from '../table-projects.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-aport-dialog',
  templateUrl: './create-aport-dialog.component.html',
  styleUrls: ['./create-aport-dialog.component.scss']
})
export class CreateAportDialogComponent {

  public form = this.fb.group({
    cant: [null, [Validators.required]],
  });
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<TableProjectsComponent>,
    private fb: FormBuilder,
    private proService: ProjectsService,
    private utilsService: UtilsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      console.table(data)
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    setAporte() {
      let pro: any = this.data;
      pro.row.actual = pro.row.actual + this.form.value.cant!
      this.proService.putProject(pro.row).subscribe((resp) => {
        pro.row.origin = pro.row.titulo;
        pro.row.cant = this.form.value.cant!;
        this.utilsService.setIncome(pro.row, resp.project, 'pro', 'Aporte realizado')
        this.onNoClick();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: `Proyecto ${pro.titulo} creado con éxito.`,
        });
        this.router.navigate(['preload']);
      });
      
    }
  
}
