import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IndexComponent } from 'src/app/index/index.component';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

   formSubmited = false;
  color = 'primary';
  checked = false;
  disabled = false;

  form = this.fb.group({
    email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    name:['',[Validators.required]],
  })

  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>, 
    public utilsService: UtilsService, 
    ) {

  }
  ngAfterViewInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

 

  handleCredentialResponse( response:any){
    this.userService.loginGoogle(response.credential).subscribe((resp) =>{
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
        title: `Bienvenido ${this.form.value.email}.`
      }),
      this.router.navigate(['/preload'])

    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg,
      })
    
    })
  }

  async register() {
    if(this.form.valid) {
      try{
        let value = this.form.value
        await this.utilsService.setUsuario(value)
        this.userService.login(value)
    .subscribe( resp => {
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
        title: `Bienvenido ${value.name}.`
      }),
        this.onNoClick();
        this.router.navigate(['dashboard'])
    })
        
        
    } catch (error) {
      console.log(error)
      }      
    }
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
    this.onNoClick()
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  
}
