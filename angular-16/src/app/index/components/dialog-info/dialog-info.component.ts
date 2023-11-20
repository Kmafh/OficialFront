import { Component, Inject } from '@angular/core';
import { IndexComponent } from '../../index.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {
  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IndexComponent>,
    ) {

  }
  
  lectura(data:any) {
    switch(data) {
      case 'mov':
        
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
